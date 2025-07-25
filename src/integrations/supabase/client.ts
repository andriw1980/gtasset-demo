// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ceubuanoctoufouowfhi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNldWJ1YW5vY3RvdWZvdW93ZmhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTQ5MDUsImV4cCI6MjA2NzE5MDkwNX0.jmSfVMS6JT-xsNeV1l46cuqfsSiinrSwWdYIj_py_OM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});