import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://grtbnpwowoilrfabehxm.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdydGJucHdvd29pbHJmYWJlaHhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1NzM5ODYsImV4cCI6MjAzMzE0OTk4Nn0.slTAAHR9WjvgZhxnxVxgd9TsMqmqHpBmFvdrheSOnLs';

export const supabase = createClient(supabaseUrl, supabaseKey);


// import { createClient } from '@supabase/supabase-js';
// import { SUPABASE_URL, SUPABASE_KEY } from '@env';

// export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

