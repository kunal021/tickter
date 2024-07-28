import supabase from "./supabase";

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session) return null;

  if (error) throw new Error(error.message);
  return session?.user;
}
