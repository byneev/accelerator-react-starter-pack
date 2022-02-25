import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchedGuitars, setSearchQuery } from '../../store/actions';
import { AppRoute, BAD_QUERY } from '../../utils/const';

export type SearchSelectItemProps = {
  children: string;
  id: number;
};

function SearchSelectItem({ children, id, }: SearchSelectItemProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <Link to={`${AppRoute.Guitars}/${id}`} onClick={() => {
      dispatch(setSearchedGuitars([]));
      dispatch(setSearchQuery(`name_like=${BAD_QUERY}`));
    }} className='form-search__select-item'
    >
      {children}
    </Link >
  );
}

export default SearchSelectItem;
