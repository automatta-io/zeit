import { sql } from 'drizzle-orm';

import { db } from '../src/app/db/db';

const run = async () => {
  const [,, ...tables] = process.argv;

  tables.forEach(async table => {
    const stmt = sql.raw(`DROP TABLE ${table}`);

    const res = await db.execute(stmt);

    console.log('Dropped table: ', table);
    console.log(res);
  });

  process.exit(0);
}

run();