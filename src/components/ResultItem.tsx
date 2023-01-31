import { useSearchContext } from '~/contexts/search.context';
import { Item, ItemProps } from './Item';

type Props = ItemProps & {
  isToBeRead?: boolean;
};

export function ResultItem({ isToBeRead, ...props }: Props) {
  const { setBookToRead } = useSearchContext();
  return (
    <Item
      actionButton={{
        label: 'Pick',
        disabled: isToBeRead,
        onClick: () => {
          if (props.id) setBookToRead(props.id);
        }
      }}
      {...props}
    />
  );
}
