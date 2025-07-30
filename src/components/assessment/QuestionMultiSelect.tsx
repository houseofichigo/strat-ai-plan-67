import React from 'react';
import { useTranslation } from 'react-i18next';
import { AssessmentQuestion } from '@/data/assessmentData';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { getLocalizedQuestion } from '@/utils/assessmentUtils';

interface QuestionMultiSelectProps {
  question: AssessmentQuestion;
  value: string[];
  onChange: (value: string[]) => void;
  sectionId: string;
}

export const QuestionMultiSelect: React.FC<QuestionMultiSelectProps> = ({
  question,
  value = [],
  onChange,
  sectionId
}) => {
  const { i18n } = useTranslation();
  const localizedQuestion = getLocalizedQuestion(question, i18n.language);

  const handleOptionToggle = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Label className="text-base font-medium leading-relaxed">
          {localizedQuestion.text}
          {localizedQuestion.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {localizedQuestion.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {localizedQuestion.description}
          </p>
        )}
        
        <div className="space-y-3">
          {localizedQuestion.options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Checkbox
                id={`${localizedQuestion.id}-${index}`}
                checked={value.includes(option)}
                onCheckedChange={() => handleOptionToggle(option)}
              />
              <Label 
                htmlFor={`${localizedQuestion.id}-${index}`}
                className="flex-1 cursor-pointer leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};