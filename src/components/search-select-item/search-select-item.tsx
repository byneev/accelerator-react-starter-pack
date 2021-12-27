export type SearchSelectItemProps = {
  children: string;
};

function SearchSelectItem({ children }: SearchSelectItemProps): JSX.Element {
  return (
    <li className='form-search__select-item' tabIndex={0}>
      {children}
    </li>
  );
}

export default SearchSelectItem;
