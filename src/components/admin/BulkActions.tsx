import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Mail, Download, CheckSquare, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

interface BulkActionsProps {
  selectedIds: string[];
  onClearSelection: () => void;
  onBulkDelete: (ids: string[]) => Promise<void>;
  onExportSelected: (ids: string[]) => void;
  submissions: any[];
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedIds,
  onClearSelection,
  onBulkDelete,
  onExportSelected,
  submissions,
}) => {
  const selectedSubmissions = submissions.filter(s => selectedIds.includes(s.id));
  const selectedEmails = selectedSubmissions
    .map(s => s.user_email)
    .filter(Boolean);

  const handleBulkDelete = async () => {
    try {
      await onBulkDelete(selectedIds);
      toast({
        title: "Success",
        description: `Deleted ${selectedIds.length} submissions`,
      });
      onClearSelection();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete submissions",
        variant: "destructive",
      });
    }
  };

  const handleExportEmails = () => {
    const emailList = selectedEmails.join('\n');
    const blob = new Blob([emailList], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-emails.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: `Exported ${selectedEmails.length} email addresses`,
    });
  };

  const handleMailtoAll = () => {
    if (selectedEmails.length === 0) {
      toast({
        title: "No emails",
        description: "No email addresses found in selected submissions",
        variant: "destructive",
      });
      return;
    }

    const emailList = selectedEmails.join(';');
    window.open(`mailto:${emailList}?subject=Follow-up on AI Readiness Assessment`);
  };

  if (selectedIds.length === 0) return null;

  return (
    <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
      <div className="flex items-center gap-2">
        <CheckSquare className="h-4 w-4" />
        <span className="font-medium">{selectedIds.length} selected</span>
        <Badge variant="secondary">{selectedEmails.length} with emails</Badge>
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" size="sm" onClick={() => onExportSelected(selectedIds)}>
          <Download className="h-4 w-4 mr-1" />
          Export Data
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleExportEmails}
          disabled={selectedEmails.length === 0}
        >
          <Download className="h-4 w-4 mr-1" />
          Export Emails
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleMailtoAll}
          disabled={selectedEmails.length === 0}
        >
          <Mail className="h-4 w-4 mr-1" />
          Email All
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Selected Submissions</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedIds.length} selected submissions? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>
    </div>
  );
};