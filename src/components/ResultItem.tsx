import { useSearchContext } from '~/contexts/search.context';
import { Item, ItemProps } from './Item';

interface Props extends ItemProps {
  isToBeRead?: boolean;
}

export function ResultItem({ isToBeRead, ...props }: Props) {
  const { setBookToRead } = useSearchContext();
  return (
    <Item
      actionButton={{
        label: 'Pick',
        disabled: isToBeRead,
        onClick: () => {
          setBookToRead(props.id);
        }
      }}
      {...props}
    />
  );
}
