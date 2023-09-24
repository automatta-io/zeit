'use client';

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Form = () => {
  const search = useSearchParams();
  const callbackUrl = search.get('callbackUrl') || '/home';

  return (
    <a role='button' onClick={() => signIn('google', { callbackUrl })}>
      Log in with Google
    </a>
  );
}