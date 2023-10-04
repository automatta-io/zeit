import { Flex, Avatar, Heading } from '@radix-ui/themes';

type CardFeedItemProps = {
  title: string;
}

export const getInitials = (name: string) => {
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

export const CardFeedItem = ({ title }: CardFeedItemProps) => {
  return (
    <Flex gap='2' align='center'>
      <Avatar size='1' fallback={getInitials(title)} />
      <Heading size='1'>{title}</Heading>
    </Flex>
  );
}