import { Container } from '@radix-ui/themes';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { db } from '../db/db';
import { LoginForm } from './LoginForm';

export default async function LogIn() {
  const authSession = await getServerSession();

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, authSession?.user?.email || ''),
    with: {
      sessions: true,
    },
  });

  // @TODO: Improve this auth check
  if (Array.isArray(user?.sessions)) {
    if (user.sessions.some(session => session.active)) {
      return redirect('/home');
    }
  }

  return (
    <Container size='2'>
      <LoginForm />
    </Container>
  )
}
