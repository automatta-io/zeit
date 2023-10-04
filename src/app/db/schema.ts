import {
  pgTable,
  text,
  serial,
  integer,
  uuid,
  boolean,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

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

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  feeds: many(feeds),
}))

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

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, { fields: [sessions.user], references: [users.id], relationName: 'sessions_user' }),
}));

export const feeds = pgTable(
  'feeds',
  {
    id: serial('id').primaryKey(),
    name: text('name'),
    url: text('url'),
    user: integer('user').notNull().references(() => users.id),
  },
);

export const feedsRelations = relations(feeds, ({ one }) => ({
  users: one(users, { fields: [feeds.user], references: [users.id], relationName: 'feeds_user' }),
}));

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
