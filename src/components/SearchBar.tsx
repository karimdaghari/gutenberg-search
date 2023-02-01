import { Button, Flex, TextInput } from '@mantine/core';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useSearchContext } from '~/contexts/search.context';

export function SearchBar() {
  const { setQuery, isLoadingOnSearch: isLoading, query } = useSearchContext();
  const [value, setValue] = useState(query);
  return (
    <Flex gap='sm'>
      <TextInput
        icon={<Search size={20} />}
        placeholder='Search for books...'
        value={value}
        onChange={({ currentTarget: { value } }) => setValue(value)}
        style={{
          width: '100%'
        }}
      />
      <Button
        loading={isLoading}
        onClick={() => {
          setQuery(value);
        }}
        disabled={!value}>
        {isLoading ? 'Searching...' : 'Search'}
      </Button>
    </Flex>
  );
}
