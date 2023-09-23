'use client';

import { Flex, Heading, Button, Link } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

import { ActionButton } from '../components/ActionButton';

export const HeaderLogin = () => {
  const router = useRouter();

  const goToLogIn = () => {
    router.push('/login');
  }

  const goToSignIn = () => {
    router.push('/signin');
  }

  return (
    <Flex justify='between'>
      <Link href="/" style={{ color: 'var(--black-a12)' }}>
        <Heading size='8' highContrast>Zeit</Heading>
      </Link>
      <Flex gap='2'>
        <Button variant='surface' onClick={goToLogIn}>Log in</Button>
        <ActionButton onClick={goToSignIn}>Sign up</ActionButton>
      </Flex>
    </Flex>
  );
}