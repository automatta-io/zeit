import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { createPgClient } from './db';

const run = async () => {
  try {
    await migrate(drizzle(createPgClient({ max: 1 })), { migrationsFolder: './drizzle' });
    process.exit(0);
  } catch (e) {
    console.log(e);
  }
}

run();
