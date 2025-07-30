import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AssessmentSection } from '@/components/assessment/AssessmentSection';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';
import { ChevronRight, ChevronLeft, AlertCircle, Save, CheckCircle } from 'lucide-react';
import { assessmentSections } from '@/data/assessmentData';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';
import { assessmentService } from '@/services/assessmentService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { analyticsService } from '@/services/analyticsService';

const Assessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showValidationAlert, setShowValidationAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sectionStartTime, setSectionStartTime] = useState(Date.now());
  const { 
    formData, 
    updateAnswer, 
    validateSection, 
    isComplete, 
    getProgress, 
    getSectionProgress,
    getFirstUnansweredQuestion,
    errors,
    isAutoSaving,
    clearDraft
  } = useAssessmentForm();
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSections = assessmentSections.length;
  const progressInfo = getProgress();
  const sectionProgress = getSectionProgress(currentSection);

  // Scroll to top when section changes and track analytics
  useEffect(() => {
    // Force scroll to very top of page
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Track section start
    const section = assessmentSections[currentSection];
    if (section) {
      analyticsService.trackSectionStart(section.id, section.title);
      setSectionStartTime(Date.now());
    }
  }, [currentSection]);

  // Track page load
  useEffect(() => {
    analyticsService.trackEvent('assessment_started');
    
    // Track page unload for drop-off detection
    const handleBeforeUnload = () => {
      const section = assessmentSections[currentSection];
      if (section) {
        analyticsService.trackDropOff(section.id);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Track when user answers questions
  const trackQuestionAnswer = (sectionId: string, questionId: string, value: string | string[]) => {
    analyticsService.trackQuestionAnswered(sectionId, questionId, value);
  };

  const handleNext = async () => {
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Hide any previous alerts
    setShowValidationAlert(false);
    
    if (validateSection(currentSection)) {
      // Track section completion
      const section = assessmentSections[currentSection];
      const timeSpent = Date.now() - sectionStartTime;
      analyticsService.trackSectionComplete(section.id, section.title, Math.floor(timeSpent / 1000));
      
      if (currentSection < totalSections - 1) {
        setCurrentSection(currentSection + 1);
      } else {
        setIsSubmitting(true); // Set submitting state
        await handleSubmit();
      }
    } else {
      // Show validation alert
      setShowValidationAlert(true);
      
      // Find and scroll to first unanswered question
      const firstUnansweredId = getFirstUnansweredQuestion(currentSection);
      setTimeout(() => {
        if (firstUnansweredId) {
          const element = document.querySelector(`[data-question-id="${firstUnansweredId}"]`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Try to focus the input element
            const input = element.querySelector('input, select, textarea');
            if (input) {
              (input as HTMLElement).focus();
            }
          }
        } else {
          // Fallback to first error element
          const firstError = document.querySelector('[data-error="true"]');
          if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 100);
    }
  };

  const handleSubmit = async () => {
    if (isComplete() && !isSubmitting) {
      try {
        // Extract email from form data for submission
        const email = formData['metadata-respondent-info']?.['email'] || 'user@example.com';
        const fullName = formData['metadata-respondent-info']?.['full-name'] || 'Anonymous User';
        
        const result = await assessmentService.submitAssessment({
          formData,
          userEmail: email as string,
          userName: fullName as string
        });
        
        if (result.success) {
          // Track assessment completion
          const totalTimeSpent = Date.now() - sectionStartTime;
          const progressInfo = getProgress();
          analyticsService.trackAssessmentComplete(Math.floor(totalTimeSpent / 1000), progressInfo.percentage);
          
          toast({
            title: 'Assessment Submitted',
            description: `Your assessment has been submitted successfully. ID: ${result.submissionId}`,
          });
          clearDraft(); // Clear saved draft after successful submission
          navigate('/thank-you', { state: { formData } });
        } else {
          setIsSubmitting(false); // Reset on failure
          toast({
            title: 'Submission Failed',
            description: result.error || 'Failed to submit assessment',
            variant: 'destructive',
          });
        }
      } catch (error) {
        setIsSubmitting(false); // Reset on error
        toast({
          title: 'Submission Error',
          description: 'An unexpected error occurred',
          variant: 'destructive',
        });
      }
    }
  };

  const handlePrevious = () => {
    setShowValidationAlert(false);
    if (currentSection > 0) {
      // Track section completion when going back
      const section = assessmentSections[currentSection];
      const timeSpent = Date.now() - sectionStartTime;
      analyticsService.trackSectionComplete(section.id, section.title, Math.floor(timeSpent / 1000));
      
      setCurrentSection(currentSection - 1);
    }
  };


  const currentSectionData = assessmentSections[currentSection];
  const hasErrors = Object.keys(errors).some(key => key.startsWith(currentSectionData.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              {/* House of Ichigo Logo - Responsive */}
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/e223ce0a-fab7-4554-81e8-d9262d3c40fd.png" 
                  alt="House of Ichigo Logo" 
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
              <div className="hidden sm:block h-8 w-px bg-border mx-2"></div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">AI Maturity Assessment</h1>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                {isAutoSaving && (
                  <div className="flex items-center gap-1">
                    <Save className="w-3 h-3 animate-pulse" />
                    <span className="hidden sm:inline">Saving...</span>
                  </div>
                )}
                <span>Section {currentSection + 1} of {totalSections}</span>
              </div>
            </div>
          </div>
          
          <Progress value={progressInfo.percentage} className="h-3" />
          
          <div className="flex flex-col sm:flex-row justify-between mt-2 text-xs text-muted-foreground gap-1">
            <span>
              Progress: {Math.round(progressInfo.percentage)}% 
              ({progressInfo.answered} of {progressInfo.total} questions)
            </span>
            <span className="hidden sm:inline">Est. {currentSectionData.estimatedTime} remaining</span>
          </div>
        </div>

        {/* Validation Alert */}
        {showValidationAlert && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Missing Required Information</AlertTitle>
            <AlertDescription>
              Please complete all required fields before proceeding to the next section.
              {hasErrors && " Check the highlighted questions below."}
            </AlertDescription>
          </Alert>
        )}

        {/* Current Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-semibold">
                  {currentSection + 1}
                </span>
                <span className="text-lg sm:text-xl">{currentSectionData.title}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 sm:mt-0">
                <span className="text-xs sm:text-sm font-normal text-muted-foreground">
                  ({currentSectionData.weight})
                </span>
                {sectionProgress.answered === sectionProgress.total && (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                )}
              </div>
            </CardTitle>
            <div className="mt-3 sm:mt-4 space-y-2">
              <p className="text-sm sm:text-base text-muted-foreground">
                {currentSectionData.description}
              </p>
              {currentSectionData.detailedDescription && (
                <p className="text-xs sm:text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border">
                  💡 {currentSectionData.detailedDescription}
                </p>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm">
                <span className="text-muted-foreground">
                  Section Progress: {sectionProgress.answered} of {sectionProgress.total} questions completed
                </span>
                {sectionProgress.answered === sectionProgress.total && (
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <AssessmentSection
              section={currentSectionData}
              sectionIndex={currentSection}
              formData={formData}
              updateAnswer={updateAnswer}
            />
          </CardContent>
        </Card>

        {/* Navigation - Enhanced Mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sticky bottom-4 bg-background/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg border shadow-lg">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center gap-2 w-full sm:w-auto order-2 sm:order-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex gap-1 sm:gap-2 order-1 sm:order-2">
            {assessmentSections.map((_, index) => {
              const sectionProgress = getSectionProgress(index);
              const isComplete = sectionProgress.answered === sectionProgress.total;
              
              return (
                <div
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentSection
                      ? 'bg-primary ring-1 sm:ring-2 ring-primary/30'
                      : isComplete
                      ? 'bg-green-600'
                      : index < currentSection
                      ? 'bg-primary/60'
                      : 'bg-muted'
                  }`}
                  title={`Section ${index + 1}: ${assessmentSections[index].title}`}
                />
              );
            })}
          </div>
          
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 w-full sm:w-auto order-3"
            variant={currentSection === totalSections - 1 ? "default" : "default"}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                {currentSection === totalSections - 1 ? 'Complete Assessment' : 'Next'}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;