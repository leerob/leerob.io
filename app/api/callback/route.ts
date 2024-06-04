import { saveSession } from 'app/auth';

export async function GET(request: Request) {
  let { searchParams } = new URL(request.url);
  let code = searchParams.get('code');
  let state = searchParams.get('state');

  if (!code || !state) {
    return Response.json(
      { error: 'Invalid response from authorization server' },
      { status: 400 }
    );
  }

  try {
    let params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.OAUTH_REDIRECT_URI!,
      client_id: process.env.OAUTH_CLIENT_ID!,
      client_secret: process.env.OAUTH_CLIENT_SECRET!,
    });

    let response = await fetch('https://vercel.com/api/login/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    let data = await response.json();

    if (data.error) {
      return Response.json({ error: data.error.message }, { status: 400 });
    }

    response = await fetch('https://api.vercel.com/v2/user', {
      headers: {
        Authorization: `Bearer ${data.auth_token}`,
      },
    });

    data = await response.json();

    console.log('data', data);

    await saveSession({ email: data.email, name: data.name || data.username });

    return Response.redirect('/guestbook');
  } catch (error) {
    return Response.json(
      { error: 'Failed to exchange token' },
      { status: 500 }
    );
  }
}
