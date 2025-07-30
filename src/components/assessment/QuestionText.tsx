import React from 'react';
import { useTranslation } from 'react-i18next';
import { AssessmentQuestion } from '@/data/assessmentData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { getLocalizedQuestion } from '@/utils/assessmentUtils';

interface QuestionTextProps {
  question: AssessmentQuestion;
  value: string;
  onChange: (value: string) => void;
  sectionId: string;
}

export const QuestionText: React.FC<QuestionTextProps> = ({
  question,
  value,
  onChange,
  sectionId
}) => {
  const { i18n } = useTranslation();
  const localizedQuestion = getLocalizedQuestion(question, i18n.language);

  const InputComponent = localizedQuestion.type === 'textarea' ? Textarea : Input;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Label htmlFor={localizedQuestion.id} className="text-base font-medium leading-relaxed">
          {localizedQuestion.text}
          {localizedQuestion.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {localizedQuestion.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {localizedQuestion.description}
          </p>
        )}
        
        <InputComponent
          id={localizedQuestion.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={localizedQuestion.type === 'textarea' ? "Share your thoughts..." : "Type your answer..."}
          className="w-full"
          rows={localizedQuestion.type === 'textarea' ? 4 : undefined}
        />
      </div>
    </Card>
  );
};