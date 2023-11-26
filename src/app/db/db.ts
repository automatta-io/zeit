import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { Options as PostgresOptions } from 'postgres';
import postgres from 'postgres';
import { config } from 'dotenv';

import * as schema from './schema';

config({
  debug: process.env.DEBUG as unknown as boolean,
  path: './.env.local',
}); 

export const createPgClient = (options?: PostgresOptions<{}>) => postgres(process.env.POSTGRES_URI as string, options);

const client = createPgClient();

export const db = drizzle<typeof schema>(client, { schema });
