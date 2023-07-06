import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://cpsvtvmuvwynqkcttkhl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwc3Z0dm11dnd5bnFrY3R0a2hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgzOTM5MzYsImV4cCI6MjAwMzk2OTkzNn0.uF4JMC221ScsmnTFG6ue4QSXs3r4VAhRbIM9Hj1i9Yk"
);
