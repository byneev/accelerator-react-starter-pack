import SearchSelectItem from '../search-select-item/search-select-item';

export type SearchSelectProps = {
  searchResults: string[];
};

function SearchSelect({ searchResults }: SearchSelectProps): JSX.Element {
  return (
    <ul className="form-search__select-list hidden">
      {searchResults.map((item) => (
        <SearchSelectItem key={item}>{item}</SearchSelectItem>
      ))}
    </ul>
  );
}

export default SearchSelect;
