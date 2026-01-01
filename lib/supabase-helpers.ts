// Helper function to check if user is admin
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith('@alino.net');
}
