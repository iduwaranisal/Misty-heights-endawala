// Admin session management using JWT stored in cookies (no third-party auth library)
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SESSION_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "mistyheights-fallback-secret-2024"
);
const COOKIE_NAME = "mh_admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

export interface AdminSession {
  username: string;
  loggedInAt: number;
}

export async function createAdminSession(username: string): Promise<string> {
  const token = await new SignJWT({ username, loggedInAt: Date.now() })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(SESSION_SECRET);
  return token;
}

export async function verifyAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, SESSION_SECRET);
    return {
      username: payload.username as string,
      loggedInAt: payload.loggedInAt as number,
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
