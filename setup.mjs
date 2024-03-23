import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const template = `---
title: 'Hello, World!'
publishedAt: '2023-01-01'
summary: 'This is your first blog post.'
---

Hello, World!`;

const homePage = `export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my portfolio</h1>
      <p className="prose prose-neutral dark:prose-invert">
        This is your new portfolio.
      </p>
    </section>
  );
}
`;

const workPage = `export default function Page() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">my work</h1>
      <p className="prose prose-neutral dark:prose-invert">
        This is where your work experience goes.
      </p>
    </section>
  );
}
`;

const deleteFolderRecursive = async (path) => {
  const stat = await fs.stat(path);
  if (stat.isDirectory()) {
    const files = await fs.readdir(path);
    await Promise.all(
      files.map((file) => deleteFolderRecursive(`${path}/${file}`))
    );
    await fs.rmdir(path);
  } else {
    await fs.unlink(path);
  }
};

(async () => {
  dotenv.config();

  if (process.env.IS_TEMPLATE === 'false') {
    // Before the setup, we check the environment variable `IS_TEMPLATE`.
    // In this repository, its value is initially set to true, but on
    // my personal site, I override it to false. This means that when
    // folks clone it for the first time, all my personal content will
    // be deleted, so they can start fresh.
    return;
  }

  const contentDir = path.join(process.cwd(), 'content');
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const appDir = path.join(process.cwd(), 'app');
  const workDir = path.join(process.cwd(), 'app', 'work');

  await deleteFolderRecursive(contentDir);
  await deleteFolderRecursive(imagesDir);
  await fs.mkdir(contentDir);
  await fs.writeFile(path.join(contentDir, 'hello-world.mdx'), template);
  await fs.writeFile(path.join(appDir, 'page.tsx'), homePage);
  await fs.writeFile(path.join(workDir, 'page.tsx'), workPage);
})();
