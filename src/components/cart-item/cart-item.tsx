/* eslint-disable no-console */
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAmountToChangeSum, setCartProduct, setIsModalToCartOpen, setLastQuantity } from '../../store/actions';
import { cartReducer } from '../../store/reducers/cart-reducer';
import { getCartSum } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { GuitarTypeAliases, LOCALE, MAX_COUNT_IN_CART } from '../../utils/const';
import { getCorrectImgURL } from '../../utils/helpers';

export type CartItemProps = {
  product: ProductProps;
}

function CartItem({ product, }: CartItemProps): JSX.Element {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const quantityButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    if (!(evt.target instanceof HTMLButtonElement)) {
      return;
    }
    const name = evt.target.name;
    if (name === 'minus' && quantity > 1) {
      setQuantity((previous) => previous - 1);
      dispatch(cartReducer.actions.decrementCartSum(product.price));
    }
    if (name === 'plus' && quantity < 99) {
      setQuantity((previous) => previous + 1);
      dispatch(cartReducer.actions.incrementCartSum(product.price));
    }
    if (name === 'minus' && quantity === 1) {
      dispatch(setCartProduct(product));
      dispatch(setLastQuantity(quantity));
      dispatch(setAmountToChangeSum(quantity * product.price));
      dispatch(setIsModalToCartOpen(true));
    }
  };

  const quantityChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = +evt.target.value;
    if (value >= 0 && value <= MAX_COUNT_IN_CART) {
      const range = value - quantity;
      setQuantity(value);
      if (range >= 0) {
        dispatch(cartReducer.actions.incrementCartSum(range * product.price));
      } else {
        dispatch(cartReducer.actions.decrementCartSum(range * product.price));
      }
    }
  };

  const removeButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setCartProduct(product));
    dispatch(setLastQuantity(quantity));
    dispatch(setAmountToChangeSum(quantity * product.price));
    dispatch(setIsModalToCartOpen(true));
  };

  return (
    <div className='cart-item'>
      <button onClick={removeButtonClickHandle} className='cart-item__close-button button-cross' type='button' aria-label='Удалить'><span className='button-cross__icon'></span><span className='cart-item__close-button-interactive-area'></span>
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
        <button onClick={quantityButtonClickHandle} name='minus' className='quantity__button' aria-label='Уменьшить количество'>
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-minus'></use>
          </svg>
        </button>
        <input onChange={quantityChangeHandle} className='quantity__input' type='number' placeholder='1' id='2-count' name='2-count' max='99' value={quantity} />
        <button onClick={quantityButtonClickHandle} name='plus' className='quantity__button' aria-label='Увеличить количество'>
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-plus'></use>
          </svg>
        </button>
      </div>
      <div className='cart-item__price-total'>{(quantity * product.price).toLocaleString(LOCALE)} ₽</div>
    </div>
  );
}

export default CartItem;
