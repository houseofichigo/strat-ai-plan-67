-- Test if the assessment system is working by checking if we can add a test submission
INSERT INTO assessment_submissions (
  user_email,
  user_name,
  submission_data,
  status
) VALUES (
  'admin.test@example.com',
  'Admin Test User',
  '{"business-strategy": {"identified-problems": "Multiple use-cases aligned to OKRs / growth strategy"}}',
  'submitted'
);

-- Check current submission count
SELECT COUNT(*) as total_submissions FROM assessment_submissions;