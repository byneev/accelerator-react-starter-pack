import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShouldShowSpinner } from '../../store/actions';
import { getCommentsFromServer, getProductsFromServer } from '../../store/api-actions';
import { getCartGuitars, getCurrentQuery, getGuitars, getStartRange } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import ProductCard from '../product-card/product-card';

function ProductsList(): JSX.Element {
  const dispatch = useDispatch();
  const currentQuery = useSelector(getCurrentQuery);
  const actualGuitars = useSelector(getGuitars);
  const startRange = useSelector(getStartRange);
  const cartGuitars = useSelector(getCartGuitars);

  useEffect(() => {
    dispatch(setShouldShowSpinner(true));
    dispatch(getProductsFromServer(currentQuery, startRange));
  }, [dispatch, currentQuery, startRange]);

  useEffect(() => {
    actualGuitars.forEach((guitar) => dispatch(getCommentsFromServer(guitar.id)));
  }, [actualGuitars, dispatch]);

  return (
    <div className='cards catalog__cards'>
      {actualGuitars.map((item: ProductProps) => (
        <ProductCard key={item.id} product={item} isInCart={cartGuitars.some((guitar: [ProductProps, number]) => guitar[0].id === item.id)} />
      ))}
    </div>
  );
}

export default ProductsList;
