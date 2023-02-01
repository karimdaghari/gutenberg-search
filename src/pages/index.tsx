import {
  Anchor,
  AppShell,
  Center,
  Container,
  SimpleGrid,
  Stack
} from '@mantine/core';
import { ResultList } from '~/components/ResultList';
import { SearchBar } from '~/components/SearchBar';
import { ToReadList } from '~/components/ToReadList';

export default function Index() {
  return (
    <>
      <Center bg='dark' py='xs'>
        <Anchor
          style={{
            color: 'white'
          }}
          href='https://github.com/karimdaghari/gutenberg-search'
          target='_blank'
          align='center'>
          See the source on GitHub
        </Anchor>
      </Center>
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
    </>
  );
}
