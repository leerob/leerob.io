import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  let { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function saveSession(user: { email: string; name: string }) {
  // Need to change to longer
  let expires = new Date(Date.now() + 10 * 1000);
  let session = await encrypt({ user, expires });
  cookies().set('session', session, { expires, httpOnly: true });
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
}

export async function getSession() {
  let session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}
