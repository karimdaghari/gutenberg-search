import { useSearchContext } from '~/contexts/search.context';
import { BaseItem, ItemProps } from '../BaseItem';

type Props = ItemProps & {
  isToBeRead?: boolean;
};

export function ResultItem({ isToBeRead, ...props }: Props) {
  const { setBookToRead } = useSearchContext();
  return (
    <BaseItem
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
