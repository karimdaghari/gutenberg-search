import { Button, Flex, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useSearchContext } from '~/contexts/search.context';

export function SearchBar() {
  const { setQuery } = useSearchContext();
  const [value, setValue] = useState('');
  return (
    <Flex gap='sm'>
      <TextInput
        placeholder='Search for books...'
        value={value}
        onChange={({ currentTarget: { value } }) => setValue(value)}
        style={{
          width: '100%'
        }}
      />
      <Button
        onClick={() => {
          setQuery(value);
        }}
        disabled={!value}>
        Search
      </Button>
    </Flex>
  );
}
