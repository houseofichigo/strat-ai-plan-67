import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsEvent {
  event_type: string;
  section_id?: string;
  question_id?: string;
  user_session?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface AssessmentAnalytics {
  total_submissions: number;
  completion_rate: number;
  average_time_spent: number;
  section_completion_rates: Record<string, number>;
  popular_answers: Record<string, Record<string, number>>;
  drop_off_points: Array<{
    section_id: string;
    section_name: string;
    drop_off_rate: number;
  }>;
}

class AnalyticsService {
  private sessionId: string;
  private startTime: number;
  private events: AnalyticsEvent[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Track assessment events
  trackEvent(eventType: string, data?: Record<string, any>) {
    const event: AnalyticsEvent = {
      event_type: eventType,
      user_session: this.sessionId,
      timestamp: new Date().toISOString(),
      metadata: data
    };

    this.events.push(event);
    
    // Store in localStorage as backup
    try {
      const existingEvents = JSON.parse(localStorage.getItem('assessment_analytics') || '[]');
      existingEvents.push(event);
      localStorage.setItem('assessment_analytics', JSON.stringify(existingEvents));
    } catch (error) {
      // Silent fail
    }
  }

  // Track section start
  trackSectionStart(sectionId: string, sectionName: string) {
    this.trackEvent('section_start', {
      section_id: sectionId,
      section_name: sectionName
    });
  }

  // Track section completion
  trackSectionComplete(sectionId: string, sectionName: string, timeSpent: number) {
    this.trackEvent('section_complete', {
      section_id: sectionId,
      section_name: sectionName,
      time_spent_seconds: timeSpent
    });
  }

  // Track question answered
  trackQuestionAnswered(sectionId: string, questionId: string, answerValue: string | string[]) {
    this.trackEvent('question_answered', {
      section_id: sectionId,
      question_id: questionId,
      answer_value: Array.isArray(answerValue) ? answerValue.join(',') : answerValue
    });
  }

  // Track assessment completion
  trackAssessmentComplete(totalTimeSpent: number, completionRate: number) {
    this.trackEvent('assessment_complete', {
      total_time_spent_seconds: totalTimeSpent,
      completion_rate: completionRate
    });
  }

  // Track user drop-off
  trackDropOff(sectionId: string, questionId?: string) {
    this.trackEvent('user_drop_off', {
      section_id: sectionId,
      question_id: questionId,
      time_spent_before_drop_off: Date.now() - this.startTime
    });
  }

  // Get session analytics
  getSessionAnalytics() {
    return {
      sessionId: this.sessionId,
      startTime: this.startTime,
      currentTime: Date.now(),
      totalTimeSpent: Date.now() - this.startTime,
      eventsCount: this.events.length,
      events: this.events
    };
  }

  // Store analytics event in Supabase
  async storeEvent(event: AnalyticsEvent): Promise<void> {
    try {
      const { error } = await supabase
        .from('analytics_events')
        .insert([event]);
      
      if (error) {
        console.warn('Failed to store analytics event:', error);
      }
    } catch (error) {
      console.warn('Failed to store analytics event:', error);
    }
  }

  // Enhanced tracking with Supabase storage
  async trackEventToSupabase(eventType: string, data?: Record<string, any>) {
    const event: AnalyticsEvent = {
      event_type: eventType,
      user_session: this.sessionId,
      timestamp: new Date().toISOString(),
      metadata: data
    };

    // Store locally as backup
    this.trackEvent(eventType, data);
    
    // Store in Supabase
    await this.storeEvent(event);
  }

  // Get analytics from database for admin dashboard
  async getAnalytics(): Promise<{ success: boolean; data?: AssessmentAnalytics; error?: string }> {
    try {
      // Get total submissions
      const { count: totalSubmissions, error: submissionsError } = await supabase
        .from('assessment_submissions')
        .select('*', { count: 'exact', head: true });

      if (submissionsError) {
        return { success: false, error: submissionsError.message };
      }

      // Get detailed answers for analysis
      const { data: answers, error: answersError } = await supabase
        .from('assessment_answers')
        .select('*');

      if (answersError) {
        return { success: false, error: answersError.message };
      }

      // Get analytics events for enhanced insights
      const { data: events, error: eventsError } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10000);

      if (eventsError) {
        console.warn('Failed to fetch analytics events:', eventsError);
      }

      // Calculate analytics
      const analytics = this.calculateAnalytics(totalSubmissions || 0, answers || [], events || []);
      
      // Store aggregated metrics in summary table
      await this.updateAnalyticsSummary(analytics);
      
      return { success: true, data: analytics };
    } catch (error) {
      return { success: false, error: 'Failed to fetch analytics' };
    }
  }

  // Update analytics summary table with aggregated metrics
  private async updateAnalyticsSummary(analytics: AssessmentAnalytics): Promise<void> {
    try {
      const summaryData = [
        {
          metric_name: 'section_completion_rates',
          metric_value: analytics.section_completion_rates
        },
        {
          metric_name: 'popular_answers',
          metric_value: analytics.popular_answers
        },
        {
          metric_name: 'user_engagement',
          metric_value: {
            total_submissions: analytics.total_submissions,
            completion_rate: analytics.completion_rate,
            average_time_spent: analytics.average_time_spent
          }
        }
      ];

      for (const summary of summaryData) {
        await supabase
          .from('analytics_summary')
          .upsert(summary, { onConflict: 'metric_name' });
      }
    } catch (error) {
      console.warn('Failed to update analytics summary:', error);
    }
  }

  private calculateAnalytics(totalSubmissions: number, answers: any[], events: any[] = []): AssessmentAnalytics {
    // Group answers by section
    const sectionStats: Record<string, { completed: number; total_questions: number }> = {};
    const answerCounts: Record<string, Record<string, number>> = {};

    answers.forEach(answer => {
      const sectionId = answer.section_id;
      
      if (!sectionStats[sectionId]) {
        sectionStats[sectionId] = { completed: 0, total_questions: 0 };
      }
      
      sectionStats[sectionId].completed++;
      
      // Track answer popularity
      const questionKey = `${sectionId}.${answer.question_id}`;
      if (!answerCounts[questionKey]) {
        answerCounts[questionKey] = {};
      }
      
      const answerValue = answer.answer_value || answer.answer_array?.join(',') || 'No Answer';
      answerCounts[questionKey][answerValue] = (answerCounts[questionKey][answerValue] || 0) + 1;
    });

    // Calculate completion rates
    const sectionCompletionRates: Record<string, number> = {};
    Object.keys(sectionStats).forEach(sectionId => {
      sectionCompletionRates[sectionId] = totalSubmissions > 0 
        ? (sectionStats[sectionId].completed / totalSubmissions) * 100 
        : 0;
    });

    // Calculate average time from events
    let averageTime = 1200; // Default 20 minutes
    if (events.length > 0) {
      const completionEvents = events.filter(e => e.event_type === 'assessment_complete');
      if (completionEvents.length > 0) {
        const totalTime = completionEvents.reduce((sum, event) => {
          return sum + (event.metadata?.total_time_spent_seconds || 0);
        }, 0);
        averageTime = Math.round(totalTime / completionEvents.length);
      }
    }

    // Calculate drop-off points (sections with lowest completion rates)
    const dropOffPoints = Object.entries(sectionCompletionRates)
      .map(([sectionId, rate]) => ({
        section_id: sectionId,
        section_name: sectionId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        drop_off_rate: 100 - rate
      }))
      .sort((a, b) => b.drop_off_rate - a.drop_off_rate)
      .slice(0, 5);

    // Calculate enhanced completion rate based on actual data
    const completedSubmissions = answers.reduce((acc, answer) => {
      if (!acc.has(answer.submission_id)) {
        acc.add(answer.submission_id);
      }
      return acc;
    }, new Set()).size;

    const enhancedCompletionRate = totalSubmissions > 0 
      ? Math.round((completedSubmissions / totalSubmissions) * 100) 
      : 0;

    return {
      total_submissions: totalSubmissions,
      completion_rate: enhancedCompletionRate,
      average_time_spent: averageTime,
      section_completion_rates: sectionCompletionRates,
      popular_answers: answerCounts,
      drop_off_points: dropOffPoints
    };
  }

  // Export analytics data for admin
  exportAnalyticsData() {
    const sessionAnalytics = this.getSessionAnalytics();
    const localStorageData = JSON.parse(localStorage.getItem('assessment_analytics') || '[]');
    
    return {
      session_analytics: sessionAnalytics,
      all_events: localStorageData,
      export_timestamp: new Date().toISOString()
    };
  }
}

export const analyticsService = new AnalyticsService();

// Track page visibility changes for drop-off detection
if (typeof window !== 'undefined') {
  let isVisible = true;
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isVisible) {
      analyticsService.trackEvent('page_hidden');
      isVisible = false;
    } else if (!document.hidden && !isVisible) {
      analyticsService.trackEvent('page_visible');
      isVisible = true;
    }
  });

  // Track beforeunload for drop-off
  window.addEventListener('beforeunload', () => {
    analyticsService.trackEvent('page_unload');
  });
}