import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCommentsFromServer } from '../../store/api-actions';
import { getReviews } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { AppRoute, LOCALE } from '../../utils/const';
import ProductRate from '../product-rate/product-rate';

export type ProductCardProps = {
  product: ProductProps;
};

function ProductCard({ product, }: ProductCardProps): JSX.Element {
  const priceString = product.price.toLocaleString(LOCALE);
  const [img, adress] = product.previewImg.split('/');
  const previewImg = [img, '/content/', adress];
  const dispatch = useDispatch();
  const reviews = useSelector(getReviews);

  useEffect(() => {
    dispatch(getCommentsFromServer(product.id));
  }, [dispatch, product]);

  return (
    <div className='product-card'>
      <img
        src={`/${previewImg.join('')}`}
        width='75'
        height='190'
        alt={product.name}
      />
      <div className='product-card__info'>
        <ProductRate rating={product.rating} ratingsCount={String(reviews.length)} route={AppRoute.Catalog} />
        <p className='product-card__title'>{product.name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {`${priceString} ₽`}
        </p>
      </div>
      <div className='product-card__buttons'>
        <Link
          className='button button--mini'
          to={`${AppRoute.Guitars}/${product.id}`}
        >
          Подробнее
        </Link>
        <a
          className='button button--red button--mini button--add-to-cart'
          href='/'
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
