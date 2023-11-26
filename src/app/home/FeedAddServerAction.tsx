'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '../api/auth/[...nextauth]/route';
import { db } from '../db/db';
import { feeds } from '../db/schema';
import { FeedAddStatusEnum } from './FeedAddStatusEnum';

export type FeedAddServerState = {
  status: FeedAddStatusEnum;
  message: string | null;
  data: unknown;
}

export const feedAddAction = async (_prevState: FeedAddServerState, formData: FormData): Promise<FeedAddServerState> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      status: FeedAddStatusEnum.ERROR,
      message: 'Unavailable session',
      data: null,
    } 
  }

  const data = {
    url: formData.get('url'),
    name: formData.get('name'),
  }

  if (!data.url) {
    return {
      status: FeedAddStatusEnum.ERROR,
      message: 'Invalid URL',
      data: null,
    }
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, session.user!.email!),
    columns: {
      id: true,
    },
  });

  await db.insert(feeds).values({
    user: user!.id,
    url: data.url,
    name: data.name,
  });

  return {
    status: FeedAddStatusEnum.SUCCESS,
    message: 'Success added a new',
    data: {},
  };
}