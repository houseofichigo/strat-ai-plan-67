import { AssessmentQuestion, AssessmentSectionData } from '@/data/assessmentData';

export const getLocalizedText = (text: string, textFr?: string, language: string = 'en'): string => {
  if (language === 'fr' && textFr) {
    return textFr;
  }
  return text;
};

export const getLocalizedOptions = (options: string[] = [], optionsFr: string[] = [], language: string = 'en'): string[] => {
  if (language === 'fr' && optionsFr && optionsFr.length > 0) {
    return optionsFr;
  }
  return options;
};

export const getLocalizedQuestion = (question: AssessmentQuestion, language: string = 'en'): AssessmentQuestion => {
  return {
    ...question,
    text: getLocalizedText(question.text, question.textFr, language),
    description: getLocalizedText(question.description || '', question.descriptionFr, language),
    options: getLocalizedOptions(question.options || [], question.optionsFr || [], language),
    tooltip: getLocalizedText(question.tooltip || '', question.tooltipFr, language),
  };
};

export const getLocalizedSection = (section: AssessmentSectionData, language: string = 'en'): AssessmentSectionData => {
  return {
    ...section,
    title: getLocalizedText(section.title, section.titleFr, language),
    description: getLocalizedText(section.description, section.descriptionFr, language),
    detailedDescription: getLocalizedText(section.detailedDescription || '', section.detailedDescriptionFr, language),
    weight: getLocalizedText(section.weight, section.weightFr, language),
    estimatedTime: getLocalizedText(section.estimatedTime, section.estimatedTimeFr, language),
    questions: section.questions.map(q => getLocalizedQuestion(q, language))
  };
};