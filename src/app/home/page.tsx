import { Container, Flex } from '@radix-ui/themes';

import { FeedList } from './Feed/FeedList';
import { FeedButtonAdd } from './FeedButtonAdd';

export default async function Home() {
  return (
    <Container size='4' style={{ padding: 'var(--space-8) 0' }}>
      <Flex gap='4'>
        <FeedList />
        <Flex direction='column' width='100%'>
          <Flex justify='end' width='100%'>
            <FeedButtonAdd />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}
