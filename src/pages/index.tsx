import { AppShell, Container, Group, SimpleGrid, Stack } from '@mantine/core';
import { ResultList } from '~/components/ResultList';
import { SearchBar } from '~/components/SearchBar';
import { ToReadList } from '~/components/ToReadList';

export default function Index() {
  return (
    <AppShell>
      <Container>
        <Stack>
          <SearchBar />
          <SimpleGrid cols={2}>
            <ResultList />
            <ToReadList />
          </SimpleGrid>
        </Stack>
      </Container>
    </AppShell>
  );
}
