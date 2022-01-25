import { useSelector } from 'react-redux';
import { getStartWithQueryGuitars } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import SearchSelectItem from '../search-select-item/search-select-item';

function SearchSelect(): JSX.Element {
  const searchResults = useSelector(getStartWithQueryGuitars);

  return (
    <ul style={{ zIndex: 100, }} className={searchResults.length !== 0 ? 'form-search__select-list' : 'form-search__select-list hidden'}>
      {searchResults.map((item: ProductProps) => (
        <SearchSelectItem key={item.id} id={item.id}>{item.name}</SearchSelectItem>
      ))}
    </ul>
  );
}

export default SearchSelect;
