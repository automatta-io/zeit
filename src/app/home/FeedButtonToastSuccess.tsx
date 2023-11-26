'use client';

import * as Toast from '@radix-ui/react-toast';

import { ActionButton } from '../../components/ActionButton';
import styles from './FeedButtonToastSuccess.module.css';

type FeedButtonToastSuccessProps = {
  open: boolean;
  onOpenChange: VoidFunction;
}

export const FeedButtonToastSuccess = ({ open, onOpenChange }: FeedButtonToastSuccessProps) => (
  <Toast.Provider swipeDirection='left' duration={5000}>
    <Toast.Root className={styles.ToastRoot} open={open} onOpenChange={onOpenChange}>
      <Toast.Title className={styles.ToastTitle}>New feed added!</Toast.Title>
      <Toast.Description className={styles.ToastDescription} asChild>
        <p>
          A new feed RSS has been added!
        </p>
      </Toast.Description>
      <Toast.Action asChild altText="Access the detail of the new added feed!" className={styles.ToastAction}>
        <ActionButton>Go to detail</ActionButton>
      </Toast.Action>
    </Toast.Root>
    <Toast.Viewport className={styles.ToastViewport} />
  </Toast.Provider>
);
