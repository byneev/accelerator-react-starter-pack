import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

export type SearchSelectItemProps = {
  children: string;
  id: number;
};

function SearchSelectItem({ children, id, }: SearchSelectItemProps): JSX.Element {
  return (
    <Link to={`${AppRoute.Guitars}/${id}`} className='form-search__select-item'>
      {children}
    </Link >
  );
}

export default SearchSelectItem;
