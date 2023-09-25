import { drizzle, PostgresJsDatabase,  } from 'drizzle-orm/postgres-js';
import type { Options as PostgresOptions } from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const createPgClient = (options?: PostgresOptions<{}>) => postgres(process.env.POSTGRES_URI as string, options);

const client = createPgClient();

export const db: PostgresJsDatabase = drizzle(client);

if (process.env.NODE_ENV === 'development') {
  await migrate(drizzle(createPgClient({ max: 1 })), { migrationsFolder: './migration' });
}
