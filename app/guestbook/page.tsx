import { getSession } from 'app/auth';
import { getGuestbookEntries } from 'app/db/queries';
import { logout } from 'app/auth';
import { redirect } from 'next/navigation';
import Form from './form';

export const metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
};

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await logout();
        redirect('/guestbook');
      }}
    >
      <button
        className="text-xs text-neutral-700 dark:text-neutral-300 mt-2 mb-6"
        type="submit"
      >
        Log out
      </button>
    </form>
  );
}

function SignIn() {
  return (
    <a
      className="px-3 py-2 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 mb-8"
      href={`https://vercel.com/api/login/oauth/authorize?client_id=${
        process.env.OAUTH_CLIENT_ID
      }&redirect_uri=${encodeURIComponent(
        process.env.OAUTH_REDIRECT_URI!
      )}&response_type=code&scope=openid+email+profile&state=${Math.random()
        .toString(36)
        .substring(7)}`}
    >
      <img alt="Vercel logo" src="/vercel-logo.svg" width="20" height="20" />
      <div className="ml-3">Login with Vercel</div>
    </a>
  );
}

export default function GuestbookPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">
        sign my guestbook
      </h1>
      <GuestbookForm />
      <GuestbookEntries />
    </section>
  );
}

async function GuestbookForm() {
  let session = await getSession();

  return session?.user ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <SignIn />
  );
}

async function GuestbookEntries() {
  let entries = await getGuestbookEntries();

  if (entries.length === 0) {
    return null;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="flex flex-col space-y-1 mb-4">
      <div className="w-full text-sm break-words">
        <span className="text-neutral-600 dark:text-neutral-400 mr-1">
          {entry.created_by}:
        </span>
        {entry.body}
      </div>
    </div>
  ));
}
