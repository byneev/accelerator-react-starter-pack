/* eslint-disable no-console */
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCurrentPage, setStartRange } from '../../store/actions';
import { getCurrentPage } from '../../store/selectors';
import { AppRoute, PRODUCTS_LIMIT_ON_PAGE } from '../../utils/const';

export type PaginationItemProps = {
  pageLink: string;
};

function PaginationItem({
  pageLink,
}: PaginationItemProps): JSX.Element {
  const dispatch = useDispatch();
  const currentPage = useSelector(getCurrentPage);
  let actualPage = '';
  if (isNaN(+pageLink)) {
    actualPage = pageLink === 'Назад' ? String(+currentPage - 1) : String(+currentPage + 1);
  } else {
    actualPage = pageLink;
  }
  const isActive = +pageLink === +currentPage;

  return isActive ? (
    <li className='pagination__page pagination__page--active'>
      <a className='link pagination__page-link'>{pageLink}</a>
    </li>
  ) : (
    <li className='pagination__page'>
      <Link
        onClick={() => {
          dispatch(setStartRange((+actualPage - 1) * PRODUCTS_LIMIT_ON_PAGE));
          dispatch(setCurrentPage(actualPage));
        }}
        className='link pagination__page-link'
        to={`${AppRoute.Catalog}/${actualPage}`}
      >
        {pageLink}
      </Link>
    </li >
  );
}

export default PaginationItem;
