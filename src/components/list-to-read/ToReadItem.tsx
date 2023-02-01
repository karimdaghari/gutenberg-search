import { useSearchContext } from '~/contexts/search.context';
import { BaseItem, ItemProps } from '../BaseItem';

export function ToReadItem(props: ItemProps) {
  const { removeBookToRead } = useSearchContext();

  return (
    <BaseItem
      {...props}
      actionButton={{
        label: 'Remove',
        onClick: () => {
          if (props.id) removeBookToRead(props.id);
        }
      }}
    />
  );
}
