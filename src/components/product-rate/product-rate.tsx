import { AppRoute, STARS } from '../../utils/const';
import ProductRateStar from '../product-rate-star/product-rate-star';

export type ProductRateProps = {
  rating: number;
  ratingsCount: string;
  route: AppRoute,
};

function ProductRate({ rating, ratingsCount, route, }: ProductRateProps): JSX.Element {
  const classNames = ['rate'];
  const sizes: number[] = [];
  if (route === AppRoute.Catalog) {
    classNames.push('product-card__rate');
    sizes.push(12);
    sizes.push(11);
  }
  if (route === AppRoute.Guitars) {
    classNames.push('product-container__rating');
    sizes.push(14);
    sizes.push(14);
  }
  if (route === AppRoute.Reviews) {
    classNames.push('review__rating-panel');
    sizes.push(16);
    sizes.push(16);
  }

  return (
    <div className={classNames.join(' ')} aria-hidden='true'>
      <span className='visually-hidden'>Рейтинг:</span>
      {STARS.map((item) =>
        item > rating ? (
          <ProductRateStar key={item} isFull={false} sizes={sizes} />
        ) : (
          <ProductRateStar key={item} isFull sizes={sizes} />
        )
      )}
      <span className='rate__count'>{ratingsCount}</span>
      <span className='rate__message'></span>
    </div>
  );
}

export default ProductRate;
