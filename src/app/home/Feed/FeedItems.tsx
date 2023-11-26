'use client';

import { Flex } from '@radix-ui/themes';

import { useFeedContext } from "../FeedContext"

export const FeedItems = () => {
  const { selectedFeed } = useFeedContext();

  return (
    <Flex direction='column'>
      {selectedFeed?.items.map(item => (
        <a key={item.id} href={item.guid}>{item.title}</a>
      ))}
    </Flex>
  )
}
