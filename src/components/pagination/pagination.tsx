/* eslint-disable no-console */
import { useSelector } from 'react-redux';
import { getTotalCount } from '../../store/selectors';
import { PRODUTS_LIMIT_ON_PAGE } from '../../utils/const';
import { getPagesByContext } from '../../utils/helpers';
import PaginationItem from '../pagination-item/pagination-item';

export type PaginationProps = {
  page: string | undefined;
}

function Pagination({ page, }: PaginationProps): JSX.Element {
  const totalCount = useSelector(getTotalCount);
  const pagesCount = Math.ceil(totalCount / PRODUTS_LIMIT_ON_PAGE);
  const actualPage = page;
  const pages: string[] | undefined = getPagesByContext(actualPage, pagesCount);

  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>
        {pages.map((item) => (
          <PaginationItem page={actualPage} key={item} isActive={actualPage === item} pageLink={item} />
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
