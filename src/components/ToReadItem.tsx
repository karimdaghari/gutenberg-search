import { useSearchContext } from '~/contexts/search.context';
import { Item, ItemProps } from './Item';

export function ToReadItem(props: ItemProps) {
  const { removeBookToRead } = useSearchContext();

  return (
    <Item
      {...props}
      actionButton={{
        label: 'Remove',
        onClick: () => {
          removeBookToRead(props.id);
        }
      }}
    />
  );
}
