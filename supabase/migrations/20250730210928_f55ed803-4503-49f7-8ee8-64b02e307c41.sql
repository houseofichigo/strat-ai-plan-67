-- Clean up unused organizations created from email domains
-- Only delete organizations that are not referenced by any submissions
DELETE FROM public.organizations 
WHERE id NOT IN (
  SELECT DISTINCT organization_id 
  FROM assessment_submissions 
  WHERE organization_id IS NOT NULL
);