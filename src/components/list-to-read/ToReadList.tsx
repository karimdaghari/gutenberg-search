import {
  Flex,
  Paper,
  ScrollArea,
  Text,
  Title,
  TitleOrder
} from '@mantine/core';
import { useSearchContext } from '~/contexts/search.context';
import { ToReadItem } from './ToReadItem';
import { Glasses } from 'lucide-react';

export function ToReadList() {
  const { booksToRead } = useSearchContext();

  const ListTitle = ({ order }: { order: TitleOrder }) => (
    <Flex align='center'>
      <Glasses />
      <Title pl={4} order={order}>
        To Read
      </Title>
    </Flex>
  );

  const EmptyList = (
    <Flex justify='center' align='center' direction='column' h='100%'>
      <ListTitle order={3} />
      <Text>Pick books you want to add to this list</Text>
    </Flex>
  );

  const FilledList = (
    <>
      <ListTitle order={4} />
      <ScrollArea h='90%'>
        {booksToRead.map(({ id, formats, title }) => {
          const cover = formats['image/jpeg'];
          return <ToReadItem key={id} id={id} title={title} cover={cover} />;
        })}
      </ScrollArea>
    </>
  );

  return (
    <Paper h='85vh' shadow='sm' p='md'>
      {booksToRead.length ? FilledList : EmptyList}
    </Paper>
  );
}
