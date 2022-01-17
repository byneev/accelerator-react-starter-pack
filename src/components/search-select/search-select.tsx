import { useSelector } from 'react-redux';
import { getSearchedGuitars } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import SearchSelectItem from '../search-select-item/search-select-item';

function SearchSelect(): JSX.Element {
  const searchResults = useSelector(getSearchedGuitars);

  return (
    <ul style={{ zIndex: 100, }} className={searchResults.length !== 0 ? 'form-search__select-list' : 'form-search__select-list hidden'}>
      {searchResults.map((item: ProductProps) => (
        <SearchSelectItem key={item.id} id={item.id}>{item.name}</SearchSelectItem>
      ))}
    </ul>
  );
}

export default SearchSelect;
