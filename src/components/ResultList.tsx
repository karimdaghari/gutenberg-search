import { Paper, ScrollArea } from '@mantine/core';
import { useEffect, useMemo, useRef } from 'react';
import { useSearchContext } from '~/contexts/search.context';
import { ResultItem } from './ResultItem';
import { useIntersection } from '@mantine/hooks';

export function ResultList() {
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1
  });
  const { books, booksToReadIds, loadMore } = useSearchContext();

  const shouldLoadMore = useMemo(
    () => (books.length && entry?.isIntersecting ? true : false),
    [entry, books]
  );

  useEffect(() => {
    if (shouldLoadMore) {
      loadMore();
    }
  }, [shouldLoadMore, loadMore]);

  return (
    <Paper ref={containerRef} component={ScrollArea} h={750} shadow='sm' p='md'>
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
          <span ref={ref} />
        </>
      ) : null}
    </Paper>
  );
}
