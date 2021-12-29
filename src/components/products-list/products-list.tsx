import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentSort, getGuitars } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { getSortedArrayByContext } from '../../utils/helpers';
import ProductCard from '../product-card/product-card';

function ProductsList(): JSX.Element {
  const guitars = useSelector(getGuitars);
  const sort = useSelector(getCurrentSort);
  const actualGuitars = useMemo(() => getSortedArrayByContext(guitars, sort), [guitars, sort]);

  return (
    <div className='cards catalog__cards'>
      {actualGuitars.slice(0, 9).map((item: ProductProps) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}

export default ProductsList;
