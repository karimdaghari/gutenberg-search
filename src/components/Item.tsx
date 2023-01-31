import { Button, Card, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';

export interface ItemProps {
  id: number;
  title: string;
  cover: string;
  authors: string[];
}

interface Props extends ItemProps {
  actionButton: {
    label: string;
    disabled?: boolean;
    onClick: () => void;
  };
}

export function Item({ cover, title, authors, actionButton }: Props) {
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
        <Button disabled={actionButton.disabled} onClick={actionButton.onClick}>
          {actionButton.label}
        </Button>
      </Flex>
    </Card>
  );
}
