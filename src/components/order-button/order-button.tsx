export type OrderButtonProps = {
  isUp: boolean;
  isActive: boolean;
};

function OrderButton({ isUp, isActive, }: OrderButtonProps): JSX.Element {
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
    <button
      className={classNames.join(' ')}
      aria-label={ariaLabel}
      tabIndex={-1}
    >
    </button>
  );
}

export default OrderButton;
