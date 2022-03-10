import { ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartGuitars, removeFromCartGuitars, setCartProduct, setGuitarsCount, setIsModalToCartOpen, setLastQuantity } from '../../store/actions';
import { getLastQuantity } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { GuitarTypeAliases, LOCALE, MAX_COUNT_IN_CART } from '../../utils/const';
import { getCorrectImgURL } from '../../utils/helpers';

export type CartItemProps = {
  product: ProductProps;
  count: number;
}

function CartItem({ product, count, }: CartItemProps): JSX.Element {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number | string>(count);
  const lastQuantity = useSelector(getLastQuantity);

  const quantityButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    if (!(evt.target instanceof HTMLButtonElement)) {
      return;
    }
    const name = evt.target.name;
    if (name === 'minus' && quantity > 1) {
      setQuantity((previous) => +previous - 1);
      dispatch(removeFromCartGuitars(product));
    }
    if (name === 'plus' && quantity < 99) {
      setQuantity((previous) => +previous + 1);
      dispatch(addToCartGuitars(product));
    }
    if (name === 'minus' && quantity === 1) {
      dispatch(setCartProduct(product));
      dispatch(setLastQuantity(quantity));
      dispatch(setIsModalToCartOpen(true));
    }
  };

  const quantityChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;
    if (evt.target.value === '') {
      dispatch(setLastQuantity(+quantity));
      setQuantity('');
    } else if (value >= 0 && value <= MAX_COUNT_IN_CART) {
      setQuantity(value);
      dispatch(setGuitarsCount([product, value]));
    }
  };

  const quantityBlurHandle = (evt: FocusEvent<HTMLInputElement>) => {
    if (evt.target.value === '') {
      setQuantity(lastQuantity);
      dispatch(setGuitarsCount([product, lastQuantity]));
    } else if (+evt.target.value === 0) {
      setQuantity(1);
      dispatch(setGuitarsCount([product, 1]));
    }
  };

  const removeButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setCartProduct(product));
    dispatch(setLastQuantity(+quantity));
    dispatch(setIsModalToCartOpen(true));
  };

  return (
    <div className='cart-item'>
      <button data-testid='remove-from-cart' onClick={removeButtonClickHandle} className='cart-item__close-button button-cross' type='button' aria-label='Удалить'><span className='button-cross__icon'></span><span className='cart-item__close-button-interactive-area'></span>
      </button>
      <div className='cart-item__image'>
        <img src={getCorrectImgURL(product)} width='55' height='130' alt='ЭлектроГитара Честер bass' />
      </div>
      <div className='product-info cart-item__info'>
        <p className='product-info__title'>{GuitarTypeAliases.get(product.type)} {product.name}</p>
        <p className='product-info__info'>Артикул: {product.vendorCode}</p>
        <p className='product-info__info'>{GuitarTypeAliases.get(product.type)}, {product.stringCount} струнная</p>
      </div>
      <div className='cart-item__price'>{product.price.toLocaleString(LOCALE)} ₽</div>
      <div className='quantity cart-item__quantity'>
        <button data-testid='minus' onClick={quantityButtonClickHandle} name='minus' className='quantity__button' aria-label='Уменьшить количество'>
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-minus'></use>
          </svg>
        </button>
        <input onBlur={quantityBlurHandle} data-testid='quantity' onChange={quantityChangeHandle} className='quantity__input' type='number' placeholder={String(quantity)} id='2-count' name='2-count' max='99' value={quantity} />
        <button data-testid='plus' onClick={quantityButtonClickHandle} name='plus' className='quantity__button' aria-label='Увеличить количество'>
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-plus'></use>
          </svg>
        </button>
      </div>
      <div data-testid='price-total' className='cart-item__price-total'>{(quantity === '' ? lastQuantity * product.price : +quantity * product.price).toLocaleString(LOCALE)} ₽</div>
    </div>
  );
}

export default CartItem;
