export interface JwtPayload {
  sub: string; // User ID
  email: string;
  role: string; // Role name: USER, OWNER, ADMIN
  permissions?: string[];
  iat?: number;
  exp?: number;
}
