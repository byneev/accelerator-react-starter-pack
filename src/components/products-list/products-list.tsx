/* eslint-disable no-console */
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFilters, setPriceMax, setPriceMin } from '../../store/actions';
import { getProductsFromServer } from '../../store/api-actions';
import { getCurrentFilters, getCurrentSort, getGuitars, getIsFilterDefault, getMaxPrice, getMinPrice } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { getQueryByFilters, getSortedArrayByContext } from '../../utils/helpers';
import ProductCard from '../product-card/product-card';

function ProductsList(): JSX.Element {
  const dispatch = useDispatch();
  const isFilterDefault = useSelector(getIsFilterDefault);
  const guitars = useSelector(getGuitars);
  const priceMin = useMemo(() => guitars.slice().sort((a: ProductProps, b: ProductProps) => a.price - b.price)[0].price, [guitars]);
  const priceMax = useMemo(() => guitars.slice().sort((a: ProductProps, b: ProductProps) => b.price - a.price)[0].price, [guitars]);
  dispatch(setPriceMin(String(priceMin)));
  dispatch(setPriceMax(String(priceMax)));
  const filters = useSelector(getCurrentFilters);
  const sort = useSelector(getCurrentSort);
  const actualGuitars = useMemo(() => getSortedArrayByContext(guitars, sort), [guitars, sort]);

  useEffect(() => {
    dispatch(setCurrentFilters({ ...filters, priceMin: String(priceMin), priceMax: String(priceMax), }));
  }, []);

  useEffect(() => {
    if (!isFilterDefault) {
      dispatch(getProductsFromServer(getQueryByFilters(filters)));
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
