import { Flex, Text, TextField } from '@radix-ui/themes';
import { useFormState } from 'react-dom';

import { FeedAddServerState, feedAddAction } from './FeedAddServerAction';
import { FeedAddStatusEnum } from './FeedAddStatusEnum';

const initialState: FeedAddServerState = {
  status: FeedAddStatusEnum.INITIAL,
  message: null,
  data: {},
}

type FeedButtonAddFormProps = {
  onSuccess: (state: FeedAddServerState) => void;
}

export const FeedButtonAddForm = ({ onSuccess }: FeedButtonAddFormProps) => {
  const [state, feedAddFormAction] = useFormState(feedAddAction, initialState);

  if (state.status === FeedAddStatusEnum.SUCCESS) {
    onSuccess(state);
  }

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
