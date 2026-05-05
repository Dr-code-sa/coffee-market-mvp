import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vlsaapouoychmanbsgug.supabase.co";
const supabaseKey = "sb_publishable_SBF-CKKE366zymr5a9Qc3w_d1ADNdXn";

export const supabase = createClient(supabaseUrl, supabaseKey);