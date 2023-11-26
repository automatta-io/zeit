import { Flex, Text, TextField } from '@radix-ui/themes';
import { experimental_useFormState as useFormState } from 'react-dom';

import { feedAddAction } from './FeedAddServerAction';

const initialState = {
  name: null,
  url: null,
}

export const FeedButtonAddForm = () => {
  const [_, feedAddFormAction] = useFormState(feedAddAction, initialState);

  return (
    <form id='form-add-rss-feed' action={feedAddFormAction}>
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
  );
}
