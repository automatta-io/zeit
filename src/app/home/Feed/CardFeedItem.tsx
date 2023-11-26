'use client';

import { Flex, Avatar, Heading } from '@radix-ui/themes';

import { useFeedContext } from '../FeedContext';
import type { Feed } from '../FeedContext';

type CardFeedItemProps = {
  feed: Feed;
}

const getInitials = (name: string) => {
  let _name = name.trim()

  if (_name.length <= 2) {
    return name
  }

  return _name
      .split(/\s+/)
      .map(w => [...w][0])
      .slice(0, 2)
      .join('')
}

export const CardFeedItem = ({ feed }: CardFeedItemProps) => {
  const { setSelectedFeed } = useFeedContext();

  const title = feed.title;

  const handleSelectFeed = () => {
    setSelectedFeed(feed);
  }

  return (
    <Flex gap='2' align='center' onClick={handleSelectFeed}>
      <Avatar size='1' fallback={getInitials(title)} />
      <Heading size='1'>{title}</Heading>
    </Flex>
  );
}