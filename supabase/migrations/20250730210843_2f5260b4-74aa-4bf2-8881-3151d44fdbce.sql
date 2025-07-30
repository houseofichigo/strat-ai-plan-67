-- Create new function to get or create organization by company name
CREATE OR REPLACE FUNCTION public.get_or_create_organization_by_company_name(company_name_input text)
 RETURNS uuid
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  org_id UUID;
  normalized_name TEXT;
BEGIN
  -- Return NULL if no company name provided
  IF company_name_input IS NULL OR trim(company_name_input) = '' THEN
    RETURN NULL;
  END IF;
  
  -- Normalize company name for matching (trim, lowercase, remove common suffixes)
  normalized_name := lower(trim(company_name_input));
  normalized_name := regexp_replace(normalized_name, '\s+(inc\.?|llc\.?|ltd\.?|corp\.?|corporation|company|co\.?)$', '', 'gi');
  normalized_name := regexp_replace(normalized_name, '\s+', ' ', 'g');
  
  -- Check if organization already exists with exact match first
  SELECT id INTO org_id 
  FROM public.organizations 
  WHERE lower(trim(name)) = lower(trim(company_name_input));
  
  -- If not found, try normalized name matching
  IF org_id IS NULL THEN
    SELECT id INTO org_id 
    FROM public.organizations 
    WHERE lower(trim(regexp_replace(name, '\s+(inc\.?|llc\.?|ltd\.?|corp\.?|corporation|company|co\.?)$', '', 'gi'))) = normalized_name;
  END IF;
  
  -- If still not found, create new organization
  IF org_id IS NULL THEN
    INSERT INTO public.organizations (name)
    VALUES (trim(company_name_input))
    RETURNING id INTO org_id;
  END IF;
  
  RETURN org_id;
END;
$function$;

-- Update existing assessment submissions to link them to organizations based on company names
-- First, let's create organizations for submissions that have company names but no organization_id
WITH company_data AS (
  SELECT 
    id as submission_id,
    submission_data->'metadata-respondent-info'->>'company-name' as company_name
  FROM assessment_submissions 
  WHERE organization_id IS NULL 
    AND submission_data->'metadata-respondent-info'->>'company-name' IS NOT NULL
    AND trim(submission_data->'metadata-respondent-info'->>'company-name') != ''
),
org_updates AS (
  SELECT 
    submission_id,
    company_name,
    public.get_or_create_organization_by_company_name(company_name) as new_org_id
  FROM company_data
  WHERE company_name IS NOT NULL
)
UPDATE assessment_submissions 
SET organization_id = org_updates.new_org_id
FROM org_updates 
WHERE assessment_submissions.id = org_updates.submission_id 
  AND org_updates.new_org_id IS NOT NULL;

-- Also update submissions that have organization_id but the organization name doesn't match the company name
-- This fixes cases where email domain created wrong organization names
WITH mismatched_orgs AS (
  SELECT 
    s.id as submission_id,
    s.organization_id as current_org_id,
    s.submission_data->'metadata-respondent-info'->>'company-name' as company_name,
    o.name as current_org_name
  FROM assessment_submissions s
  JOIN organizations o ON s.organization_id = o.id
  WHERE s.submission_data->'metadata-respondent-info'->>'company-name' IS NOT NULL
    AND trim(s.submission_data->'metadata-respondent-info'->>'company-name') != ''
    AND lower(trim(o.name)) != lower(trim(s.submission_data->'metadata-respondent-info'->>'company-name'))
),
correct_org_updates AS (
  SELECT 
    submission_id,
    company_name,
    public.get_or_create_organization_by_company_name(company_name) as correct_org_id
  FROM mismatched_orgs
)
UPDATE assessment_submissions 
SET organization_id = correct_org_updates.correct_org_id
FROM correct_org_updates 
WHERE assessment_submissions.id = correct_org_updates.submission_id 
  AND correct_org_updates.correct_org_id IS NOT NULL;