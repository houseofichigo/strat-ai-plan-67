import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Star, TrendingUp, Shield, Lightbulb, Rocket, ExternalLink, Mail, Check, Clock } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Confetti Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute animate-bounce" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}>
            <Star className="w-4 h-4 text-primary fill-current opacity-70" />
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>
        
        <div className="text-center space-y-8">
          {/* Success Message */}
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {t('thankYou.title')}
            </h1>
            <p className="text-xl text-blue-600 font-semibold">
              {t('thankYou.subtitle')}
            </p>
          </div>

          {/* Progress Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Check className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('thankYou.title')}</h3>
              <p className="text-sm text-gray-700">{t('thankYou.subtitle')}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('thankYou.whatNext')}</h3>
              <p className="text-sm text-gray-700">{t('thankYou.takeaway2')}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Rocket className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('thankYou.keyTakeaways')}</h3>
              <p className="text-sm text-gray-700">{t('thankYou.takeaway1')}</p>
            </div>
          </div>

          {/* Report Information */}
          <div className="bg-white p-8 rounded-lg border shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('thankYou.message')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('thankYou.reportDescription')}
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg font-semibold text-blue-800">
                {t('thankYou.timeframe')}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                {t('thankYou.emailNote')}
              </p>
            </div>
          </div>

          {/* Report Contents */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              {t('thankYou.reportIncludes')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg border text-left">
                <h4 className="font-semibold text-gray-900 mb-2">{t('thankYou.maturityScore')}</h4>
                <p className="text-sm text-gray-600">{t('thankYou.maturityScoreDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border text-left">
                <h4 className="font-semibold text-gray-900 mb-2">{t('thankYou.detailedAnalysis')}</h4>
                <p className="text-sm text-gray-600">{t('thankYou.detailedAnalysisDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border text-left">
                <h4 className="font-semibold text-gray-900 mb-2">{t('thankYou.operationalRecommendations')}</h4>
                <p className="text-sm text-gray-600">{t('thankYou.operationalRecommendationsDesc')}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border text-left">
                <h4 className="font-semibold text-gray-900 mb-2">{t('thankYou.implementationRoadmap')}</h4>
                <p className="text-sm text-gray-600">{t('thankYou.implementationRoadmapDesc')}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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

          {/* Footer Note */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">{t('thankYou.thankYouNote')}</h4>
            <p className="text-sm text-gray-600">
              {t('thankYou.dataHelp')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}