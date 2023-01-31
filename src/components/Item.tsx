import { Button, Card, Flex, Skeleton, Text, Title } from '@mantine/core';
import Image from 'next/image';

interface BaseItemProps {
  loading?: boolean;
  id: number;
  title: string;
  cover: string;
  authors?: string[];
}

export type ItemProps =
  | (Partial<BaseItemProps> & { loading: true })
  | (BaseItemProps & { loading?: false });

type Props = ItemProps & {
  actionButton: {
    label: string;
    disabled?: boolean;
    onClick: () => void;
  };
};

export function Item({ cover, title, authors, actionButton, loading }: Props) {
  return (
    <Card>
      <Flex gap='sm' align='center' justify='space-between'>
        <Flex align='center' gap='sm'>
          {loading ? (
            <Skeleton radius='sm' w={80} h={100} />
          ) : (
            <Image
              width={60}
              height={100}
              src={cover}
              alt={`Cover for the book: ${title}`}
              style={{
                objectFit: 'contain'
              }}
            />
          )}
          <div>
            {loading ? (
              <Skeleton radius='sm' w={180} h={15} />
            ) : (
              <Title order={5} lineClamp={2}>
                {title}
              </Title>
            )}
            {loading ? (
              <Skeleton radius='sm' w={100} h={15} mt={6} />
            ) : authors?.length ? (
              <Text>By: {authors.join(', ')}</Text>
            ) : null}
          </div>
        </Flex>
        {loading ? (
          <Skeleton radius='sm' w={100} h={40} />
        ) : (
          <Button
            disabled={actionButton.disabled}
            onClick={actionButton.onClick}>
            {actionButton.label}
          </Button>
        )}
      </Flex>
    </Card>
  );
}
