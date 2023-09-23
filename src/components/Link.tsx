'use client';

import { Link as RadixLink, useThemeContext } from '@radix-ui/themes';
import { CSSProperties, useCallback } from 'react';

type LinkPropsVariant = 'action' | 'default';

type LinkProps = {
  children: React.ReactNode;
  href?: string;
  variant?: LinkPropsVariant;
  highContrast?: boolean;
}

export const Link = ({
  children,
  href,
  variant = 'default',
  highContrast = false,
}: LinkProps) => {
  const theme = useThemeContext();

  console.log(theme);
  
  const styles = useCallback((v: LinkPropsVariant) => {
    const s: Record<LinkPropsVariant, CSSProperties> = {
      action: {
        backgroundColor: 'var(--accent-12)',
        borderRadius: 'var(--radius-2)',
        color: 'var(--gray-1)',
      },
      default: {},
    }

    return s[variant] || s.default;
  }, []);

  console.log(styles(variant));

  return (
    <RadixLink
      href={href}
      style={styles(variant)}
      highContrast={highContrast}
    >
      {children}
    </RadixLink>
  );
}