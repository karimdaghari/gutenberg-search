import {
  Badge,
  Box,
  Flex,
  Group,
  Paper,
  ScrollArea,
  Text,
  Title
} from '@mantine/core';
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
  const {
    books,
    booksToReadIds,
    loadMore,
    isLoading,
    query,
    setQuery,
    booksCount
  } = useSearchContext();

  const shouldLoadMore = useMemo(
    () => (books.length && entry?.isIntersecting ? true : false),
    [entry, books]
  );

  useEffect(() => {
    if (shouldLoadMore) {
      loadMore();
    }
  }, [shouldLoadMore, loadMore]);

  const Loading = (
    <>
      {Array.from({ length: 32 }).map((_, i) => (
        <ResultItem key={i} loading />
      ))}
    </>
  );

  const Success = (
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
  );

  const suggestions = ['Mark Twain', 'Jane Austen', 'Charles Dickens'];

  return (
    <Paper h='90vh' shadow='sm' p='sm'>
      {!query ? (
        <Flex justify='center' align='center' direction='column' h='100%'>
          <Title order={3}>Search the Gutenberg Library</Title>
          <Text>Here are a few queries to get you started...</Text>
          <Group pt='sm'>
            {suggestions.map((s) => (
              <Badge
                component='button'
                onClick={() => setQuery(s)}
                key={s}
                style={{
                  cursor: 'pointer'
                }}>
                {s}
              </Badge>
            ))}
          </Group>
        </Flex>
      ) : books.length || isLoading ? (
        <>
          <Box pb='sm'>
            <Title order={4}>Results</Title>
            {isLoading ? null : (
              <Text>There are {booksCount} books in total</Text>
            )}
          </Box>
          <ScrollArea ref={containerRef} h='90%'>
            {books.length ? Success : null}
            {isLoading ? Loading : null}
          </ScrollArea>
        </>
      ) : (
        <Flex justify='center' align='center' direction='column' h='100%'>
          <Title order={3}>No results found</Title>
          <Text>It seems that there are no books for: {query}</Text>
        </Flex>
      )}
    </Paper>
  );
}
