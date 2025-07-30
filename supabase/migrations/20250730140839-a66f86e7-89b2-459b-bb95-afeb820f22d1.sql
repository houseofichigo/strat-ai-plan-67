-- Create organizations table to track companies
CREATE TABLE public.organizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  industry TEXT,
  size_category TEXT CHECK (size_category IN ('startup', 'small', 'medium', 'large', 'enterprise')),
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Create policies for organizations
CREATE POLICY "Anyone can view organizations" 
ON public.organizations 
FOR SELECT 
USING (true);

CREATE POLICY "System can manage organizations" 
ON public.organizations 
FOR ALL 
USING (true);

-- Add organization reference to assessment_submissions
ALTER TABLE public.assessment_submissions 
ADD COLUMN organization_id UUID REFERENCES public.organizations(id);

-- Create index for better performance
CREATE INDEX idx_assessment_submissions_organization_id ON public.assessment_submissions(organization_id);
CREATE INDEX idx_organizations_domain ON public.organizations(domain);

-- Create trigger for automatic updated_at on organizations
CREATE TRIGGER update_organizations_updated_at
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get or create organization from email domain
CREATE OR REPLACE FUNCTION public.get_or_create_organization(user_email TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  email_domain TEXT;
  org_id UUID;
  org_name TEXT;
BEGIN
  -- Extract domain from email
  email_domain := split_part(user_email, '@', 2);
  
  -- Skip common email providers
  IF email_domain IN ('gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com') THEN
    RETURN NULL;
  END IF;
  
  -- Check if organization already exists
  SELECT id INTO org_id 
  FROM public.organizations 
  WHERE domain = email_domain;
  
  -- If not found, create new organization
  IF org_id IS NULL THEN
    -- Generate organization name from domain
    org_name := initcap(replace(split_part(email_domain, '.', 1), '-', ' '));
    
    INSERT INTO public.organizations (name, domain)
    VALUES (org_name, email_domain)
    RETURNING id INTO org_id;
  END IF;
  
  RETURN org_id;
END;
$$;

-- Update existing submissions to link to organizations
UPDATE public.assessment_submissions 
SET organization_id = public.get_or_create_organization(user_email)
WHERE user_email IS NOT NULL AND organization_id IS NULL;

-- Create organization analytics summary table
CREATE TABLE public.organization_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  total_submissions INTEGER DEFAULT 0,
  completion_rate DECIMAL(5,2) DEFAULT 0,
  average_time_spent INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(organization_id)
);

-- Enable RLS
ALTER TABLE public.organization_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for organization analytics
CREATE POLICY "Anyone can view organization analytics" 
ON public.organization_analytics 
FOR SELECT 
USING (true);

CREATE POLICY "System can manage organization analytics" 
ON public.organization_analytics 
FOR ALL 
USING (true);

-- Create trigger for automatic updated_at on organization_analytics
CREATE TRIGGER update_organization_analytics_updated_at
BEFORE UPDATE ON public.organization_analytics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();