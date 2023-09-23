import { Flex, Avatar, Heading } from '@radix-ui/themes';

export const CardFeedItem = () => {
  return (
    <Flex gap='2' align='center'>
      <Avatar size='1' fallback='GE' />
      <Heading size='1'>My custom feed</Heading>
    </Flex>
  );
}