/* eslint-disable no-console */
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromServer } from '../../store/api-actions';
import { getCurrentFilters, getCurrentSort, getGuitars, getIsFilterDefault } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { getQueryByFilters, getSortedArrayByContext } from '../../utils/helpers';
import ProductCard from '../product-card/product-card';

function ProductsList(): JSX.Element {
  const dispatch = useDispatch();
  const isFilterDefault = useSelector(getIsFilterDefault);
  const guitars = useSelector(getGuitars);
  const filters = useSelector(getCurrentFilters);
  const sort = useSelector(getCurrentSort);
  const actualGuitars = useMemo(() => getSortedArrayByContext(guitars, sort), [guitars, sort]);

  useEffect(() => {
    if (!isFilterDefault) {
      dispatch(getProductsFromServer(getQueryByFilters(filters, sort)));
    }
  }, [filters, dispatch, isFilterDefault]);

  return (
    <div className='cards catalog__cards'>
      {actualGuitars.slice(0, 9).map((item: ProductProps) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductsList;
