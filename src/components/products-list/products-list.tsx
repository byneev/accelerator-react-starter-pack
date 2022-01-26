/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShouldShowSpinner } from '../../store/actions';
import { getProductsFromServer } from '../../store/api-actions';
import { getCurrentQuery, getGuitars, getIsFilterDefault, getStartRange } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import ProductCard from '../product-card/product-card';

function ProductsList(): JSX.Element {
  const dispatch = useDispatch();
  const currentQuery = useSelector(getCurrentQuery);
  const isFilterDefault = useSelector(getIsFilterDefault);
  const actualGuitars = useSelector(getGuitars);
  const startRange = useSelector(getStartRange);

  useEffect(() => {
    if (!isFilterDefault) {
      dispatch(setShouldShowSpinner(true));
      dispatch(getProductsFromServer(currentQuery, startRange));
    }
  }, [dispatch, isFilterDefault, startRange, currentQuery]);

  return (
    <div className='cards catalog__cards'>
      {actualGuitars.map((item: ProductProps) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductsList;
