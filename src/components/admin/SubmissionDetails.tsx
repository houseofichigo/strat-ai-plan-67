import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SubmissionDetailsProps {
  submission: any;
  isOpen: boolean;
  onClose: () => void;
}

export const SubmissionDetails: React.FC<SubmissionDetailsProps> = ({
  submission,
  isOpen,
  onClose,
}) => {
  if (!submission) return null;

  const renderAnswer = (answer: any, questionType: string) => {
    if (questionType === 'multiselect' && Array.isArray(answer)) {
      return answer.map((item, index) => (
        <Badge key={index} variant="secondary" className="mr-1 mb-1">
          {item}
        </Badge>
      ));
    }
    return answer || 'No answer provided';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Assessment Submission Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <div className="space-y-6">
            {/* Submission Info */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <strong>Email:</strong> {submission.user_email || 'N/A'}
              </div>
              <div>
                <strong>Name:</strong> {submission.user_name || 'N/A'}
              </div>
              <div>
                <strong>Submitted:</strong> {new Date(submission.created_at).toLocaleDateString()}
              </div>
              <div>
                <strong>Status:</strong> 
                <Badge variant={submission.status === 'submitted' ? 'default' : 'secondary'} className="ml-2">
                  {submission.status}
                </Badge>
              </div>
            </div>

            {/* Assessment Data */}
            {submission.submission_data && Object.entries(submission.submission_data).map(([sectionId, sectionData]: [string, any]) => (
              <div key={sectionId} className="space-y-4">
                <h3 className="text-lg font-semibold capitalize">
                  {sectionId.replace(/-/g, ' ')}
                </h3>
                <Separator />
                <div className="space-y-3">
                  {Object.entries(sectionData || {}).map(([questionId, questionData]: [string, any]) => (
                    <div key={questionId} className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-2">{questionData.questionText || questionId}</h4>
                      <div className="text-sm text-muted-foreground mb-2">
                        Type: {questionData.questionType || 'text'}
                        {questionData.isRequired && <Badge variant="outline" className="ml-2">Required</Badge>}
                      </div>
                      <div className="font-medium">
                        {renderAnswer(questionData.answer, questionData.questionType)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};