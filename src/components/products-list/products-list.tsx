/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromServer } from '../../store/api-actions';
import { getCurrentFilters, getCurrentSort, getGuitars, getIsFilterDefault, getPaginationData } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { getQueryByFilters } from '../../utils/helpers';
import ProductCard from '../product-card/product-card';

function ProductsList(): JSX.Element {
  const dispatch = useDispatch();
  const isFilterDefault = useSelector(getIsFilterDefault);
  const actualGuitars = useSelector(getGuitars);
  const filters = useSelector(getCurrentFilters);
  const sort = useSelector(getCurrentSort);
  const paginationData = useSelector(getPaginationData);

  useEffect(() => {
    if (!isFilterDefault) {
      dispatch(getProductsFromServer(getQueryByFilters(filters, sort), paginationData));
    } else {
      dispatch(getProductsFromServer(getQueryByFilters(null, sort), paginationData));
    }
  }, [filters, dispatch, isFilterDefault, sort, paginationData]);

  return (
    <div className='cards catalog__cards'>
      {actualGuitars.slice(0, 9).map((item: ProductProps) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductsList;
