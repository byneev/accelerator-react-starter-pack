export type SortButtonProps = {
  isActive: boolean;
  children: string;
};

function SortButton({ isActive, children, }: SortButtonProps): JSX.Element {
  return (
    <button
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
