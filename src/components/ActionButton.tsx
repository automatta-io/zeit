import { MouseEventHandler, Ref, forwardRef } from 'react';
import { Button } from "@radix-ui/themes"

type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  form?: string;
  className?: string;
}

export const ActionButton = ({ children, onClick, form, className }: ActionButtonProps) => (
  <Button
    highContrast
    style={{ cursor: 'pointer' }}
    onClick={onClick}
    form={form}
    className={className}
  >
    {children}
  </Button>
);