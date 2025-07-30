-- Check if foreign key exists and add it if missing
DO $$
BEGIN
    -- Check if the foreign key constraint exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'assessment_submissions_organization_id_fkey'
        AND table_name = 'assessment_submissions'
    ) THEN
        -- Add the foreign key constraint
        ALTER TABLE public.assessment_submissions 
        ADD CONSTRAINT assessment_submissions_organization_id_fkey 
        FOREIGN KEY (organization_id) REFERENCES public.organizations(id);
    END IF;
END $$;

-- Check if organization_analytics foreign key exists and add it if missing
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'organization_analytics_organization_id_fkey'
        AND table_name = 'organization_analytics'
    ) THEN
        ALTER TABLE public.organization_analytics 
        ADD CONSTRAINT organization_analytics_organization_id_fkey 
        FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Update any existing submissions that don't have organization_id set
UPDATE public.assessment_submissions 
SET organization_id = public.get_or_create_organization(user_email)
WHERE user_email IS NOT NULL 
AND organization_id IS NULL
AND user_email NOT LIKE '%@gmail.com' 
AND user_email NOT LIKE '%@yahoo.com' 
AND user_email NOT LIKE '%@hotmail.com'
AND user_email NOT LIKE '%@outlook.com';

-- Verify the data integrity
SELECT 
    'Assessment Submissions' as table_name,
    COUNT(*) as total_records,
    COUNT(organization_id) as records_with_org,
    COUNT(*) - COUNT(organization_id) as records_without_org
FROM assessment_submissions
UNION ALL
SELECT 
    'Organizations' as table_name,
    COUNT(*) as total_records,
    COUNT(domain) as records_with_domain,
    0 as records_without_org
FROM organizations;