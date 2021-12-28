import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

export type SearchSelectItemProps = {
  children: string;
  id: number;
};

function SearchSelectItem({ children, id, }: SearchSelectItemProps): JSX.Element {
  const history = useHistory();

  return (
    <li className='form-search__select-item' tabIndex={0} onClick={() => history.push(`${AppRoute.Guitars}/${id}`)} >
      {children}
    </li>
  );
}

export default SearchSelectItem;
