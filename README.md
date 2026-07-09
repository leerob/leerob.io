[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fleerob%2Fnext-mdx-blog)
[![Deploy to PandaStack](https://dashboard.pandastack.io/deploy-button.svg)](https://dashboard.pandastack.io/deploy?repo=leerob/next-mdx-blog&type=container)

# next-mdx-blog

This is a blog template built with:

- **Framework**: [Next.js](https://nextjs.org)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Database** (Optional): [Postgres](https://vercel.com/postgres)

## Running Locally

This application requires Node.js v18.17+.

```bash
git clone https://github.com/leerob/next-mdx-blog.git
cd next-mdx-blog
pnpm install
pnpm dev
```

## Database (Optional)

Create a `.env.local` file with your `POSTGRES_URL` environment variable to store redirects.

```sql
CREATE TABLE redirects (
  id SERIAL PRIMARY KEY,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  permanent BOOLEAN NOT NULL
);
```
