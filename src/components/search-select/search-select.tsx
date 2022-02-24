import { useSelector } from 'react-redux';
import { getStartWithQueryGuitars } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import SearchSelectItem from '../search-select-item/search-select-item';

function SearchSelect(): JSX.Element {
  const searchResults = useSelector(getStartWithQueryGuitars);
  const classNames = ['form-search__select-list'];
  if (searchResults.length === 0) {
    classNames.push('hidden');
  }

  return (
    <ul style={{ zIndex: 100, }} className={classNames.join(' ')}>
      {searchResults.map((item: ProductProps) => (
        <SearchSelectItem key={item.id} id={item.id}>{item.name}</SearchSelectItem>
      ))}
    </ul>
  );
}

export default SearchSelect;
