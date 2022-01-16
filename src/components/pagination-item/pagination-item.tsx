/* eslint-disable no-console */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setStartRange } from '../../store/actions';
import { AppRoute, PRODUTS_LIMIT_ON_PAGE } from '../../utils/const';

export type PaginationItemProps = {
  isActive: boolean;
  pageLink: string;
  page: string | undefined;
};

function PaginationItem({
  isActive,
  pageLink,
  page,
}: PaginationItemProps): JSX.Element {
  const dispatch = useDispatch();
  console.log(page);

  return isActive ? (
    <li className='pagination__page pagination__page--active'>
      <a className='link pagination__page-link'>{pageLink}</a>
    </li>
  ) : (
    <li className='pagination__page'>
      <Link
        onClick={() => dispatch(setStartRange((page ? +page - 1 : 1) * PRODUTS_LIMIT_ON_PAGE))}
        className='link pagination__page-link'
        to={`${AppRoute.Catalog}/${isNaN(+pageLink) ? page : pageLink}`}
      >
        {pageLink}
      </Link>
    </li >
  );
}

export default PaginationItem;
