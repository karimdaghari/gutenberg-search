import { Flex, Paper, ScrollArea, Text, Title } from '@mantine/core';
import { useSearchContext } from '~/contexts/search.context';
import { ToReadItem } from './ToReadItem';
import { Library } from 'lucide-react';

export function ToReadList() {
  const { booksToRead } = useSearchContext();
  return (
    <Paper shadow='sm' p='md'>
      {booksToRead.length ? (
        <>
          <Flex align='center'>
            <Library />
            <Title pl={1} order={4}>
              My Library
            </Title>
          </Flex>
          <ScrollArea h='90%'>
            {booksToRead.map(({ id, formats, title }) => {
              const cover = formats['image/jpeg'];
              return (
                <ToReadItem key={id} id={id} title={title} cover={cover} />
              );
            })}
          </ScrollArea>
        </>
      ) : (
        <Flex justify='center' align='center' direction='column' h='100%'>
          <Flex align='center'>
            <Library />
            <Title pl={1} order={3}>
              My Library
            </Title>
          </Flex>
          <Text>Pick books you want to read to add them to your library</Text>
        </Flex>
      )}
    </Paper>
  );
}
