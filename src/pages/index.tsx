import { AppShell, Container, SimpleGrid, Stack } from '@mantine/core';
import { ResultList } from '~/components/ResultList';
import { SearchBar } from '~/components/SearchBar';
import { ToReadList } from '~/components/ToReadList';

export default function Index() {
  return (
    <AppShell>
      <Container>
        <Stack>
          <SearchBar />
          <SimpleGrid
            breakpoints={[
              {
                minWidth: 'sm',
                cols: 1
              },
              {
                minWidth: 'md',
                cols: 2
              }
            ]}>
            <ResultList />
            <ToReadList />
          </SimpleGrid>
        </Stack>
      </Container>
    </AppShell>
  );
}
