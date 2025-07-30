-- Fix function search_path security warnings by setting search_path properly

-- Update the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public', 'pg_temp'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Update the has_role function  
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE 
 SECURITY DEFINER
 SET search_path = 'public', 'pg_temp'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- Update the is_license_owner function
CREATE OR REPLACE FUNCTION public.is_license_owner(_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE 
 SECURITY DEFINER
 SET search_path = 'public', 'pg_temp'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.licenses
    WHERE license_owner_id = _user_id
      AND is_active = true
  )
$function$;

-- Update the get_user_license function
CREATE OR REPLACE FUNCTION public.get_user_license(_user_id uuid)
 RETURNS uuid
 LANGUAGE sql
 STABLE 
 SECURITY DEFINER
 SET search_path = 'public', 'pg_temp'
AS $function$
  SELECT l.id
  FROM public.licenses l
  JOIN public.license_assignments la ON l.id = la.license_id
  WHERE la.user_id = _user_id
    AND l.is_active = true
  LIMIT 1
$function$;