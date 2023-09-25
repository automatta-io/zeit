import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({
  debug: process.env.DEBUG as unknown as boolean,
  path: './.env.local',
}); 

export default {
  driver: 'pg',
  schema: './src/app/api/schema.ts',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URI as string,
  },
} satisfies Config;
