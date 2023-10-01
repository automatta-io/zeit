'use client';

import { Dialog, Flex, Button, Text, TextField } from '@radix-ui/themes';
import { useRef, useState } from 'react';

import { ActionButton } from "../../components/ActionButton";
import { feedAddAction } from './FeedAddAction';
import { FeedButtonToastSuccess } from './FeedButtonToastSuccess';

export const FeedButtonAdd = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [open, setOpen] = useState(false);
  const [openToastSuccess, setOpenToastSuccess] = useState(false);

  const handleAction = async (formData: FormData) => {
    const data = {
      name: formData.get('name') as string || null,
      url: formData.get('url') as string,
    }

    if (!data.url) {
      // TODO: Improve this error
      console.log('Error: missing feed URL');
      return;
    }

    const { error } = await feedAddAction(data);

    if (error) {
      return;
    }

    setOpen(false);
    setOpenToastSuccess(true);
    formRef.current?.reset();
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
          <form ref={formRef} id='form-add-rss-feed' action={handleAction}>
            <Flex direction='column' gap='3'>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>URL</Text>
                <TextField.Input name='url' placeholder="https://example.com/rss.xml" />
              </label>
              <label>
                <Text size='2' mb='1' weight='bold'>Name (optional)</Text>
                <TextField.Input name='name' />
              </label>
            </Flex>
          </form>

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