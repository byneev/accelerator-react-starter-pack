/* eslint-disable no-console */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCommentsFromServer } from '../../store/api-actions';
import { getComments } from '../../store/selectors';
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
  const comments = useSelector(getComments);
  const dispatch = useDispatch();
  let commentsCount = '';

  comments.forEach((item: string) => {
    const [id, count] = item.split('-');
    if (+id === product.id) {
      commentsCount = count;
    }
  });


  useEffect(() => {
    dispatch(getCommentsFromServer(product.id));
  }, [dispatch, product.id]);

  return (
    <div className='product-card'>
      <img
        src={`/${previewImg.join('')}`}
        width='75'
        height='190'
        alt={product.name}
      />
      <div className='product-card__info'>
        <ProductRate rating={product.rating} ratingsCount={commentsCount} />
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
