'use client';

import { FormEventHandler, useState } from 'react';
import { Dialog, Flex, Text, TextField, Button } from '@radix-ui/themes';

import { ActionButton } from "../../components/ActionButton";

export const ButtonFeedAdd = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const data = {
      name: form.get('name') || null,
      url:  form.get('url'),
    }

    const feeds = localStorage.getItem('feeds');

    if (!feeds) {
      localStorage.setItem('feeds', JSON.stringify([data]));
    } else {
      localStorage.setItem('feeds', JSON.stringify([data, ...JSON.parse(feeds)]));
    }

    setOpen(false);
  }

  return (
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
          <form id='form-add-rss-feed' onSubmit={handleSubmit}>
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
  );
}