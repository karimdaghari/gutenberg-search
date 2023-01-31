import { Button, Paper, ScrollArea } from '@mantine/core';
import { useSearchContext } from '~/contexts/search.context';
import { ResultItem } from './ResultItem';

export function ResultList() {
  const { books, booksToReadIds, loadMore } = useSearchContext();
  return (
    <Paper component={ScrollArea} h={750} shadow='sm' p='md'>
      {books.length ? (
        <>
          {books.map(({ authors, id, title, formats }) => {
            const _authors = authors.map(({ name }) => name);
            const cover = formats['image/jpeg'];
            return (
              <ResultItem
                key={id}
                id={id}
                title={title}
                authors={_authors}
                cover={cover}
                isToBeRead={booksToReadIds.includes(id)}
              />
            );
          })}
          <Button onClick={loadMore}>Load more</Button>
        </>
      ) : null}
    </Paper>
  );
}
