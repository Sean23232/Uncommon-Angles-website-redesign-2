export function isAdminRequest(request: Request): boolean {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return true;
  return request.headers.get("x-admin-passcode") === expected;
}
