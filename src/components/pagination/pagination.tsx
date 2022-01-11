import { useSelector } from 'react-redux';
import { getPaginationData } from '../../store/selectors';
import { getArrayByNumber } from '../../utils/helpers';
import PaginationItem from '../pagination-item/pagination-item';

function Pagination(): JSX.Element {
  const paginationData = useSelector(getPaginationData);
  const pagesCount = Math.ceil(paginationData.totalCount / 9);

  return (
    <div className='pagination page-content__pagination'>
      <ul className='pagination__list'>
        {getArrayByNumber(pagesCount).map((item) => (
          <PaginationItem key={item} isActive={false} pageLink={item} />
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
