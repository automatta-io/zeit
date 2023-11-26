'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]/route';
import { db } from '../db/db';
import { feeds } from '../db/schema';

type Data = {
  name: string | null;
  url: string | null;
}

export const feedAddAction = async (prevState: Data, data: Data) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      error: 'Wrong session',
    } 
  }
  
  if (!data.url) {
    return {
      error: 'Missing feed URL',
    }
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, session?.user?.email),
    columns: {
      id: true,
    },
  });

  await db.insert(feeds).values({
    user: user.id,
    name: data.name,
    url: data.url,
  });

  return { error: null };
}