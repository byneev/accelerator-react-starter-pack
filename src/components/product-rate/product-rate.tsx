import { STARS } from '../../utils/const';
import ProductRateStar from '../product-rate-star/product-rate-star';

export type ProductRateProps = {
  rating: number,
  ratingsCount: number,
}

function ProductRate({rating, ratingsCount} : ProductRateProps) : JSX.Element {
  return (
    <div className='rate product-card__rate' aria-hidden='true'>
      <span className='visually-hidden'>Рейтинг:</span>
      {STARS.map((item) => item > rating ?
        <ProductRateStar key={item} isFull={false}/> :
        <ProductRateStar key={item} isFull/>)}
      <span className='rate__count'>{ratingsCount}</span>
      <span className='rate__message'></span>
    </div>
  );
}

export default ProductRate;
