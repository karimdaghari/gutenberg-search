import {
  Alert,
  Flex,
  Paper,
  ScrollArea,
  Skeleton,
  Text,
  Title,
  UnstyledButton
} from '@mantine/core';
import { useEffect, useRef } from 'react';
import { useSearchContext } from '~/contexts/search.context';
import { ResultItem } from './ResultItem';
import { useIntersection } from '@mantine/hooks';
import { AlertCircle } from 'lucide-react';

export function ResultList() {
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1
  });

  const { books, booksToReadIds, loadMore, isLoading, query, error } =
    useSearchContext();

  useEffect(() => {
    if (entry?.isIntersecting) {
      loadMore();
    }
  }, [loadMore, entry?.isIntersecting]);

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
        const cover = formats['image/jpeg'] || formats['image/png'];
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
    </>
  );

  const NoQuery = (
    <Flex justify='center' align='center' direction='column' h='100%'>
      <Title order={3}>Search the Gutenberg Library</Title>
      <Text>Find over 60,000 free eBooks</Text>
    </Flex>
  );

  const NoResults = (
    <Flex justify='center' align='center' direction='column' h='100%'>
      <Title order={3}>No results found</Title>
      <Text>It seems that there are no books for: {query}</Text>
    </Flex>
  );

  const ErrorDisplay = (
    <Alert icon={<AlertCircle />} title='Bummer!' color='red'>
      {error?.message}
    </Alert>
  );

  return (
    <Paper h='85vh' shadow='sm' p='sm'>
      {error ? (
        ErrorDisplay
      ) : !query ? (
        NoQuery
      ) : books.length || isLoading ? (
        <>
          <Title order={4} pb='sm'>
            Results for: {query}
          </Title>
          <ScrollArea ref={containerRef} h='90%'>
            {books.length ? Success : null}
            {isLoading ? Loading : <UnstyledButton ref={ref} />}
          </ScrollArea>
        </>
      ) : (
        NoResults
      )}
    </Paper>
  );
}
