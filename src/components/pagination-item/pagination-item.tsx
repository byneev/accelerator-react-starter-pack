import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

export type PaginationItemProps = {
  isActive: boolean;
  pageLink: string;
};

function PaginationItem({
  isActive,
  pageLink,
}: PaginationItemProps): JSX.Element {
  return isActive ? (
    <li className='pagination__page pagination__page--active'>
      <a className='link pagination__page-link'>{pageLink}</a>
    </li>
  ) : (
    <li className='pagination__page'>
      <Link
        className='link pagination__page-link'
        to={`${AppRoute.Catalog}/${AppRoute.Page}/${pageLink}`}
      >
        {pageLink}
      </Link>
    </li>
  );
}

export default PaginationItem;
