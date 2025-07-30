import React from 'react';
import { useTranslation } from 'react-i18next';
import { AssessmentQuestion } from '@/data/assessmentData';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAssessmentForm } from '@/hooks/useAssessmentForm';
import { getLocalizedQuestion } from '@/utils/assessmentUtils';

interface QuestionRadioProps {
  question: AssessmentQuestion;
  value: string;
  onChange: (value: string) => void;
  sectionId: string;
}

export const QuestionRadio: React.FC<QuestionRadioProps> = ({
  question,
  value,
  onChange,
  sectionId
}) => {
  const { t, i18n } = useTranslation();
  const { getError } = useAssessmentForm();
  const localizedQuestion = getLocalizedQuestion(question, i18n.language);
  const error = getError(sectionId, question.id);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <Label className="text-base font-medium leading-relaxed">
              {localizedQuestion.text}
              {localizedQuestion.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {localizedQuestion.description && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {localizedQuestion.description}
              </p>
            )}
            {error && (
              <p className="text-sm text-destructive mt-1">{error}</p>
            )}
          </div>
          {localizedQuestion.tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{localizedQuestion.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <RadioGroup value={value} onValueChange={onChange} className="space-y-3" data-error={!!error}>
          {localizedQuestion.options?.map((option, index) => (
            <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors ${error ? 'border border-destructive/20' : ''}`}>
              <RadioGroupItem value={option} id={`${localizedQuestion.id}-${index}`} />
              <Label 
                htmlFor={`${localizedQuestion.id}-${index}`}
                className="flex-1 cursor-pointer leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </Card>
  );
};