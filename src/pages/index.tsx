import { AppShell, Container, Group } from '@mantine/core';
import { ResultList } from '~/components/ResultList';
import { SearchBar } from '~/components/SearchBar';
import { ToReadList } from '~/components/ToReadList';

export default function Index() {
  return (
    <AppShell>
      <Container>
        <SearchBar />
        <Group>
          <ResultList />
          <ToReadList />
        </Group>
      </Container>
    </AppShell>
  );
}
