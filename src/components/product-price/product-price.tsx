import { ProductProps } from '../../types/product-type';
import { LOCALE } from '../../utils/const';

export type ProductPriceProps = {
  product: ProductProps;
}

function ProductPrice({ product, }: ProductPriceProps): JSX.Element {
  return (
    <div className='product-container__price-wrapper'>
      <p className='product-container__price-info product-container__price-info--title'>Цена:</p>
      <p className='product-container__price-info product-container__price-info--value'>{product.price.toLocaleString(LOCALE)} ₽</p>
      <a className='button button--red button--big product-container__button' href=''>Добавить в корзину</a>
    </div>
  );
}

export default ProductPrice;
