import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCartProduct, setCurrentProduct, setIsModalToCartOpen } from '../../store/actions';
import { getCartGuitars, getReviewsCounts } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { AppRoute, LOCALE } from '../../utils/const';
import { getCorrectImgURL } from '../../utils/helpers';
import ProductRate from '../product-rate/product-rate';

export type ProductCardProps = {
  product: ProductProps;
};

function ProductCard({ product, }: ProductCardProps): JSX.Element {
  const dispatch = useDispatch();
  const priceString = product.price.toLocaleString(LOCALE);
  const previewImg = getCorrectImgURL(product);
  const reviewsCounts = useSelector(getReviewsCounts);
  const cartGuitars = useSelector(getCartGuitars);
  let commentsCount = '';

  reviewsCounts.forEach((item: string) => {
    const [id, count] = item.split('-');
    if (+id === product.id) {
      commentsCount = count;
    }
  });

  const AddToCartButtonClickHandle = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setCartProduct(product));
    dispatch(setIsModalToCartOpen(true));
  };

  return (
    <div className='product-card'>
      <img
        src={previewImg}
        width='75'
        height='190'
        alt={product.name}
      />
      <div className='product-card__info'>
        <ProductRate rating={product.rating} ratingsCount={commentsCount} route={AppRoute.Catalog} />
        <p className='product-card__title'>{product.name}</p>
        <p className='product-card__price'>
          <span className='visually-hidden'>Цена:</span>
          {`${priceString} ₽`}
        </p>
      </div>
      <div className='product-card__buttons'>
        <Link
          onClick={() => dispatch(setCurrentProduct(null))}
          className='button button--mini'
          to={`${AppRoute.Guitars}/${product.id}`}
        >
          Подробнее
        </Link>
        {cartGuitars.includes(product) ?
          <Link to={AppRoute.Cart} className='button button--red-border button--mini button--in-cart'>В Корзине</Link> :
          <a onClick={AddToCartButtonClickHandle} className='button button--red button--mini button--add-to-cart' href=''>Купить</a>}
      </div>
    </div>
  );
}

export default ProductCard;
