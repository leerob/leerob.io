import db from '@/lib/planetscale';
import session from '@/lib/session';

export default async function handler(req, res) {
  session(req, res);

  const { login, email } = req.session;

  if (req.method === 'GET') {
    const [rows] = await db.query(`
      SELECT * FROM guestbook
      ORDER BY updated_at DESC;
    `);

    return res.json(rows);
  }

  if (req.method === 'POST') {
    if (!login) {
      return res.status(403).send('Unauthorized');
    }

    const body = (req.body.body || '').slice(0, 500);
    await db.query(
      `
      INSERT INTO guestbook (email, body, created_by)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY
      UPDATE updated_at = now();
    `,
      [email, body, login]
    );

    const [rows] = await db.query(`
      SELECT * FROM guestbook WHERE id = last_insert_id();
    `);

    return res.status(200).json(rows[0]);
  }

  return res.send('Method not allowed.');
}
