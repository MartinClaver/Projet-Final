import { createClient } from '@supabase/supabase-js';
import config from './metro.config';

export const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_API_KEY);
