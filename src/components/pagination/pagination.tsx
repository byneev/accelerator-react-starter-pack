import { getArrayByNumber } from '../../utils/helpers';
import PaginationItem from '../pagination-item/pagination-item';

export type PaginationProps = {
  productsCount: number;
};

function Pagination({ productsCount, }: PaginationProps): JSX.Element {
  const pagesCount = Math.ceil(productsCount / 9);

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
