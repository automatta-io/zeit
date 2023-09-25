import { pgTable, text, serial, integer, uuid, boolean, uniqueIndex } from 'drizzle-orm/pg-core';

export const users = pgTable(
  "users",
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique('email'),
    profilePicture: text('profile_picture'),
  },
  (user) => ({
    userEmailIndex: uniqueIndex('users_email_unique_index').on(user.email),
  }),
);

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    user: integer('user').notNull().references(() => users.id),
    active: boolean('active'),
    expiresAt: text('expires_at'),
    accessToken: text('access_token'),
  }
);

export const feeds = pgTable(
  'feeds',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    url: text('url'),
  },
);

export const groups = pgTable(
  'groups',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    slug: text('slug').unique('slug'),
    feeds: integer('feeds').array(),
  },
  (group) => ({
    groupSlugIndex: uniqueIndex('groups_slug_unique_index').on(group.slug),
  }),
);
