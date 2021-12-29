import { MouseEvent } from 'react';
import { SortType } from '../../utils/const';

export type SortButtonProps = {
  isActive: boolean;
  isPrice: boolean;
  children: string;
  onClick: (evt: MouseEvent<HTMLButtonElement>) => void;
};

function SortButton({ isActive, children, onClick, isPrice, }: SortButtonProps): JSX.Element {
  return (
    <button
      data-type={isPrice ? SortType.Price : SortType.Popular}
      onClick={onClick}
      className={
        isActive
          ? 'catalog-sort__type-button catalog-sort__type-button--active'
          : 'catalog-sort__type-button'
      }
      aria-label={children}
      tabIndex={-1}
    >
      {children}
    </button>
  );
}

export default SortButton;
