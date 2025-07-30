import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Star, TrendingUp, Shield, Lightbulb, Rocket, ExternalLink, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormData } from '@/data/assessmentData';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/language/LanguageSelector';
interface ThankYouProps {
  formData?: FormData;
}
export default function ThankYou({
  formData
}: ThankYouProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const handleBackToAssessment = () => {
    navigate('/');
  };
  const handleVisitWebsite = () => {
    window.open('https://www.houseofichigo.com', '_blank');
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Confetti Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(30)].map((_, i) => <div key={i} className="absolute animate-bounce" style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }}>
            <Star className="w-4 h-4 text-primary fill-current opacity-70" />
          </div>)}
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-green-500 animate-scale-in" />
              <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-4">
            🎉 {t('thankYou.title')}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2 max-w-2xl mx-auto">
            {t('thankYou.message')}
          </p>
          
          
        </div>

        {/* Quick Highlights */}
        <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              {t('thankYou.whatNext')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Assessment Complete</h3>
                <p className="text-sm text-muted-foreground">8 comprehensive areas evaluated with detailed analysis</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Report Coming Soon</h3>
                <p className="text-sm text-muted-foreground">We'll email your personalized report within 3 business days</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">Take Action</h3>
                <p className="text-sm text-muted-foreground">Implement recommendations to advance your AI journey</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary CTA */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Your Report is Being Prepared</h2>
            </div>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              Our AI experts are analyzing your responses to create a comprehensive, personalized readiness report 
              with actionable recommendations tailored specifically to your organization.
            </p>
            <div className="bg-white/50 dark:bg-muted/50 p-4 rounded-lg border">
              <p className="text-sm font-medium text-primary">
                📧 We'll email your detailed AI Readiness Report within 3 business days
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Check your inbox (and spam folder) for your personalized assessment results
              </p>
            </div>
          </div>
        </div>

        {/* Report Preview */}
        <Card className="mb-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-center">Your Report Includes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold">AI Readiness Score</h4>
                  <p className="text-sm text-muted-foreground">Overall assessment across all 8 key areas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold">Detailed Section Analysis</h4>
                  <p className="text-sm text-muted-foreground">Breakdown of strengths and improvement areas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold">Actionable Recommendations</h4>
                  <p className="text-sm text-muted-foreground">Specific next steps for your AI journey</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="secondary" className="mt-1">✓</Badge>
                <div>
                  <h4 className="font-semibold">Implementation Roadmap</h4>
                  <p className="text-sm text-muted-foreground">Prioritized timeline for AI adoption</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={handleBackToAssessment} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('thankYou.retakeAssessment')}
          </Button>
          
          <Button onClick={handleVisitWebsite} className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            {t('thankYou.visitWebsite')}
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-xl mt-8">
          <h3 className="text-lg font-semibold mb-2">Thank You for Your Participation</h3>
          <p className="text-muted-foreground text-sm">
            Your data helps us improve our assessment and provide better AI readiness insights.
          </p>
        </div>
      </div>
    </div>;
}