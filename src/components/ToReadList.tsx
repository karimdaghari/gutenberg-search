import { Paper } from '@mantine/core';
import { useSearchContext } from '~/contexts/search.context';
import { ToReadItem } from './ToReadItem';

export function ToReadList() {
  const { booksToRead } = useSearchContext();
  return (
    <Paper shadow='sm' p='md'>
      {booksToRead.map(({ id, formats, title }) => {
        const cover = formats['image/jpeg'];
        return <ToReadItem id={id} title={title} cover={cover} />;
      })}
    </Paper>
  );
}
