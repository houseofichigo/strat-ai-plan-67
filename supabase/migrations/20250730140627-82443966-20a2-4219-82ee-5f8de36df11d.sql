-- Create analytics events table for better admin analytics
CREATE TABLE public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  section_id TEXT,
  question_id TEXT,
  user_session TEXT,
  user_id UUID,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics events
CREATE POLICY "Anyone can create analytics events" 
ON public.analytics_events 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins can view all analytics events" 
ON public.analytics_events 
FOR SELECT 
USING (true);

-- Create analytics summary table for aggregated data
CREATE TABLE public.analytics_summary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL UNIQUE,
  metric_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analytics_summary ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics summary
CREATE POLICY "Admins can manage analytics summary" 
ON public.analytics_summary 
FOR ALL 
USING (true);

-- Create trigger for automatic updated_at
CREATE TRIGGER update_analytics_summary_updated_at
BEFORE UPDATE ON public.analytics_summary
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial analytics summary metrics
INSERT INTO public.analytics_summary (metric_name, metric_value)
VALUES 
  ('daily_submissions', '[]'::jsonb),
  ('section_completion_rates', '{}'::jsonb),
  ('popular_answers', '{}'::jsonb),
  ('user_engagement', '{}'::jsonb)
ON CONFLICT (metric_name) DO NOTHING;