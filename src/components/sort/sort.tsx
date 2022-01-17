import { MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSort } from '../../store/actions';
import { getProductsFromServer } from '../../store/api-actions';
import { getCurrentFilters, getCurrentSort, getIsFilterDefault, getStartRange } from '../../store/selectors';
import { SortType } from '../../utils/const';
import { getQueryByFilters } from '../../utils/helpers';
import OrderButton from '../order-button/order-button';
import SortButton from '../sort-button/sort-button';

function Sort(): JSX.Element {
  const dispatch = useDispatch();
  const [byType, byDirection] = useSelector(getCurrentSort);
  const filters = useSelector(getCurrentFilters);
  const sort = useSelector(getCurrentSort);
  const startRange = useSelector(getStartRange);
  const isFilterDefault = useSelector(getIsFilterDefault);

  useEffect(() => {
    if (isFilterDefault) {
      dispatch(getProductsFromServer(getQueryByFilters(null, sort), startRange));
    }
  }, [dispatch, filters, isFilterDefault, sort, startRange]);

  const sortButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>): void => {
    evt.preventDefault();
    if (!(evt.target instanceof HTMLButtonElement)) {
      return;
    }
    const data = evt.target.dataset.type;
    const result: [SortType, SortType] = [byType, byDirection];
    switch (data) {
      case SortType.Price:
        result[0] = data;
        break;
      case SortType.Popular:
        result[0] = data;
        break;
      case SortType.Ascending:
        result[1] = data;
        break;
      case SortType.Descending:
        result[1] = data;
        break;
    }
    dispatch(setCurrentSort(result));
  };

  return (
    <div className='catalog-sort'>
      <h2 className='catalog-sort__title'>Сортировать:</h2>
      <div className='catalog-sort__type'>
        <SortButton onClick={sortButtonClickHandle} data-type={SortType.Price} isPrice isActive={byType === SortType.Price}>по цене</SortButton>
        <SortButton onClick={sortButtonClickHandle} data-type={SortType.Popular} isPrice={false} isActive={byType === SortType.Popular}>по популярности</SortButton>
      </div>
      <div className='catalog-sort__order'>
        <OrderButton onClick={sortButtonClickHandle} data-type={SortType.Ascending} isUp isActive={byDirection === SortType.Ascending} />
        <OrderButton onClick={sortButtonClickHandle} data-type={SortType.Descending} isUp={false} isActive={byDirection === SortType.Descending} />
      </div>
    </div>
  );
}

export default Sort;
