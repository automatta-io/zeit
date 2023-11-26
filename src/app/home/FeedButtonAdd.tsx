'use client';

import { Dialog, Flex, Button } from '@radix-ui/themes';
import { useState } from 'react';

import { ActionButton } from "../../components/ActionButton";
import { FeedButtonToastSuccess } from './FeedButtonToastSuccess';
import { FeedButtonAddForm } from './FeedButtonAddForm';

export const FeedButtonAdd = () => {
  const [open, setOpen] = useState(false);
  const [openToastSuccess, setOpenToastSuccess] = useState(false);

  const handleOpenToast = () => {
    setOpenToastSuccess(true);
    setOpen(false);
  }

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <ActionButton>+</ActionButton>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Title>Add new RSS feed</Dialog.Title>
          <Dialog.Description size='2' mb='4'>
            Insert the URL that you want to add as a new RSS feed.
          </Dialog.Description>

          <Flex direction='column' gap='5'>
            <FeedButtonAddForm onSuccess={handleOpenToast} />
            <Flex gap='3' justify='end' align='center'>
              <Dialog.Close>
                <Button variant='ghost' color='gray'>
                  Cancel
                </Button>
              </Dialog.Close>
              <ActionButton form='form-add-rss-feed'>Save</ActionButton>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <FeedButtonToastSuccess open={openToastSuccess} onOpenChange={setOpenToastSuccess} />
    </>
  );
}