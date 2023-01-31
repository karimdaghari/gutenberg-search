import { Button, Card, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';

interface Props {
  id: number;
  title: string;
  cover: string;
  authors: string[];
  isToBeRead?: boolean;
}

export function ResultItem({ cover, title, authors, isToBeRead }: Props) {
  return (
    <Card>
      <Flex gap='sm' align='center'>
        <Image
          width={80}
          height={100}
          src={cover}
          alt={`Cover for the book: ${title}`}
          style={{
            borderRadius: '0.5rem'
          }}
        />
        <div>
          <Title order={5} lineClamp={2}>
            {title}
          </Title>
          <Text>By: {authors.join(', ')}</Text>
        </div>
        <Button disabled={isToBeRead}>Pick</Button>
      </Flex>
    </Card>
  );
}
