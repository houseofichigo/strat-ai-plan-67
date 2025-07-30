import React from 'react';
import { AssessmentSectionData, FormData } from '@/data/assessmentData';
import { QuestionRadio } from './QuestionRadio';
import { QuestionMultiSelect } from './QuestionMultiSelect';
import { QuestionText } from './QuestionText';
import { QuestionDropdown } from './QuestionDropdown';

interface AssessmentSectionProps {
  section: AssessmentSectionData;
  sectionIndex: number;
  formData: FormData;
  updateAnswer: (sectionId: string, questionId: string, value: string | string[]) => void;
}

export const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  section,
  sectionIndex,
  formData,
  updateAnswer
}) => {
  const sectionData = formData[section.id] || {};

  return (
    <div className="space-y-6">
      {section.questions.map((question, questionIndex) => {
        const value = sectionData[question.id] || (question.type === 'multiselect' ? [] : '');
        const questionId = `${section.id}-${question.id}`;
        
        const commonProps = {
          question,
          value,
          onChange: (newValue: string | string[]) => updateAnswer(section.id, question.id, newValue),
          sectionId: section.id
        };

        const questionWrapper = (component: React.ReactNode) => (
          <div key={question.id} data-question-id={questionId}>
            {component}
          </div>
        );

        switch (question.type) {
          case 'radio':
            return questionWrapper(<QuestionRadio {...commonProps} value={value as string} />);
          case 'multiselect':
            return questionWrapper(<QuestionMultiSelect {...commonProps} value={value as string[]} />);
          case 'dropdown':
            return questionWrapper(<QuestionDropdown {...commonProps} value={value as string} />);
          case 'text':
          case 'textarea':
            return questionWrapper(<QuestionText {...commonProps} value={value as string} />);
          default:
            return null;
        }
      })}
    </div>
  );
};