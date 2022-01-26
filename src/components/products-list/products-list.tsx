/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShouldShowSpinner } from '../../store/actions';
import { getProductsFromServer } from '../../store/api-actions';
import { getCurrentFilters, getCurrentSort, getGuitars, getIsFilterDefault, getStartRange } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { getQueryByFilters } from '../../utils/helpers';
import ProductCard from '../product-card/product-card';


function ProductsList(): JSX.Element {
  const dispatch = useDispatch();
  const isFilterDefault = useSelector(getIsFilterDefault);
  const actualGuitars = useSelector(getGuitars);
  const filters = useSelector(getCurrentFilters);
  const sort = useSelector(getCurrentSort);
  const startRange = useSelector(getStartRange);

  useEffect(() => {
    if (!isFilterDefault) {
      dispatch(setShouldShowSpinner(true));
      dispatch(getProductsFromServer(getQueryByFilters(filters, sort), startRange));
    }
  }, [filters, dispatch, isFilterDefault, sort, startRange]);

  return (
    <div className='cards catalog__cards'>
      {actualGuitars.map((item: ProductProps) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductsList;
