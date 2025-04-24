import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://eocsxsywmwmppkafypdp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvY3N4c3l3bXdtcHBrYWZ5cGRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NzQ3ODIsImV4cCI6MjA2MDQ1MDc4Mn0.M3DoelQPntNrSI6SnEOwu10QzZ-5pazTMHHhefkKyzg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
