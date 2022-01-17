import { MouseEvent } from 'react';
import { SortType } from '../../utils/const';

export type OrderButtonProps = {
  isUp: boolean;
  isActive: boolean;
  onClick: (evt: MouseEvent<HTMLButtonElement>) => void;
};

function OrderButton({ isUp, isActive, onClick, }: OrderButtonProps): JSX.Element {
  let ariaLabel = 'По возрастанию';
  const classNames: string[] = ['catalog-sort__order-button'];
  if (isActive) {
    classNames.push('catalog-sort__order-button--active');
  }
  if (isUp) {
    classNames.push('catalog-sort__order-button--up');
  } else {
    classNames.push('catalog-sort__order-button--down');
    ariaLabel = 'По убыванию';
  }

  return (
    <button onClick={onClick}
      data-type={isUp ? SortType.Ascending : SortType.Descending}
      className={classNames.join(' ')}
      aria-label={ariaLabel}
      tabIndex={-1}
    >
    </button>
  );
}

export default OrderButton;
