import { MouseEventHandler, Ref, forwardRef } from 'react';
import { Button } from "@radix-ui/themes"

type ActionButtonProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  form?: string;
}

export const ActionButton = ({ children, onClick, form }: ActionButtonProps) => (
  <Button
    highContrast
    style={{ cursor: 'pointer' }}
    onClick={onClick}
    form={form}
  >
    {children}
  </Button>
);