import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setStartRange } from '../../store/actions';
import { getCurrentPage } from '../../store/selectors';
import { PRODUCTS_LIMIT_ON_PAGE } from '../../utils/const';

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

  const paginationClickHandle = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setStartRange((+actualPage - 1) * PRODUCTS_LIMIT_ON_PAGE));
    dispatch(setCurrentPage(actualPage));
  };

  return isActive ? (
    <li className='pagination__page pagination__page--active'>
      <a href='/' className='link pagination__page-link'>{pageLink}</a>
    </li>
  ) : (
    <li className='pagination__page'>
      <a href='/catalog/1'
        onClick={paginationClickHandle}
        className='link pagination__page-link'
      >
        {pageLink}
      </a>
    </li >
  );
}

export default PaginationItem;
