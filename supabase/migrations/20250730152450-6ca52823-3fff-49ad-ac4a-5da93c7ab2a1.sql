-- Update missing organization linkage for houseofichigo.com submission
UPDATE public.assessment_submissions 
SET organization_id = (SELECT public.get_or_create_organization('ahmed@houseofichigo.com'))
WHERE user_email = 'ahmed@houseofichigo.com' 
AND organization_id IS NULL;

-- Add missing foreign key constraints if they don't exist
DO $$
BEGIN
    -- Check and add assessment_submissions foreign key
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'assessment_submissions_organization_id_fkey'
        AND table_name = 'assessment_submissions'
    ) THEN
        ALTER TABLE public.assessment_submissions 
        ADD CONSTRAINT assessment_submissions_organization_id_fkey 
        FOREIGN KEY (organization_id) REFERENCES public.organizations(id);
    END IF;
    
    -- Check and add organization_analytics foreign key
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'organization_analytics_organization_id_fkey'
        AND table_name = 'organization_analytics'
    ) THEN
        ALTER TABLE public.organization_analytics 
        ADD CONSTRAINT organization_analytics_organization_id_fkey 
        FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;
    END IF;
    
    -- Check and add assessment_answers foreign key  
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'assessment_answers_submission_id_fkey'
        AND table_name = 'assessment_answers'
    ) THEN
        ALTER TABLE public.assessment_answers 
        ADD CONSTRAINT assessment_answers_submission_id_fkey 
        FOREIGN KEY (submission_id) REFERENCES public.assessment_submissions(id) ON DELETE CASCADE;
    END IF;
END $$;