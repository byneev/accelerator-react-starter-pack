/* eslint-disable no-console */
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentPage, getTotalCount } from '../../store/selectors';
import { PRODUCTS_LIMIT_ON_PAGE } from '../../utils/const';
import { getRange } from '../../utils/helpers';
import PaginationItem from '../pagination-item/pagination-item';

function Pagination(): JSX.Element {
  const currentPage = +useSelector(getCurrentPage);
  const totalCount = useSelector(getTotalCount);
  const pagesCount = Math.ceil(totalCount / PRODUCTS_LIMIT_ON_PAGE);
  const pages: string[] = useMemo(() => getRange(pagesCount, currentPage), [currentPage, pagesCount]);

  if (pagesCount === 1) {
    return <div></div>;
  }

  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>
        {pages.map((item) => (
          <PaginationItem key={item} pageLink={item} />
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
