/* eslint-disable no-nested-ternary */
import { KeyboardEvent, MouseEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartGuitars, removeFromCartGuitars, removeFullCountGuitarFromCart, setCartProduct, setIsModalToCartOpen, setIsModalToCartSuccessOpen } from '../../store/actions';
import { getCartGuitars, getLastQuantity } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { AppRoute, GuitarTypeAliases, LOCALE } from '../../utils/const';
import { getCorrectImgURL } from '../../utils/helpers';

export type ModalToCartProps = {
  product: ProductProps,
  container: AppRoute;
}

function ModalToCart({ product, container, }: ModalToCartProps): JSX.Element {
  const dispatch = useDispatch();
  const cartGuitars = useSelector(getCartGuitars);
  const lastQuantity = useSelector(getLastQuantity);
  const buttonClose = useRef<HTMLButtonElement>(null);
  const buttonRemove = useRef<HTMLButtonElement>(null);
  const isInCart = cartGuitars.some((item: [ProductProps, number]) => item[0].id === product.id);

  const toCartButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(addToCartGuitars(product));
    dispatch(setIsModalToCartOpen(false));
    dispatch(setIsModalToCartSuccessOpen(true));
  };

  const removeFromCartButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setCartProduct(product));
    dispatch(setIsModalToCartOpen(false));
    if (lastQuantity > 1) {
      dispatch(removeFullCountGuitarFromCart(product));
    }
    dispatch(removeFromCartGuitars(product));
  };

  const closeHandle = (evt: MouseEvent<HTMLElement>) => {
    dispatch(setIsModalToCartOpen(false));
    dispatch(setIsModalToCartSuccessOpen(false));
  };

  const tabKeydownHandle = (evt: KeyboardEvent) => {
    if (evt.key === 'Tab') {
      if (document.activeElement === buttonClose.current) {
        buttonRemove.current && buttonRemove.current.focus();
        evt.preventDefault();
      }
    }
  };

  const followButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsModalToCartOpen(false));
    dispatch(setIsModalToCartSuccessOpen(false));
  };

  return (
    <div onKeyDown={tabKeydownHandle} className='modal is-active'>
      <div className='modal__wrapper'>
        <div onClick={closeHandle} className='modal__overlay' data-close-modal></div>
        <div className='modal__content'>
          {isInCart ?
            <h2 className='modal__header title title--medium title--red'>Удалить этот товар?</h2> :
            <h2 className='modal__header title title--medium'>Добавить товар в корзину</h2>}
          <div className='modal__info'>
            <img className='modal__img' src={getCorrectImgURL(product)} width='67' height='137' alt={product.name} />
            <div className='modal__info-wrapper'>
              <h3 className='modal__product-name title title--little title--uppercase'>{GuitarTypeAliases.get(product.type)} {product.name}</h3>
              <p className='modal__product-params modal__product-params--margin-11'>Артикул: {product.vendorCode}</p>
              <p className='modal__product-params'>{GuitarTypeAliases.get(product.type)}, {product.stringCount} струнная</p>
              <p className='modal__price-wrapper'><span className='modal__price'>Цена:</span><span className='modal__price'>{product.price.toLocaleString(LOCALE)} ₽</span></p>
            </div>
          </div>

          <div className='modal__button-container'>
            {container === AppRoute.Guitars ?
              <button ref={buttonRemove} onClick={toCartButtonClickHandle} className='button button--red button--big modal__button modal__button--add'>Добавить в корзину</button> :
              !isInCart ?
                <button ref={buttonRemove} onClick={toCartButtonClickHandle} className='button button--red button--big modal__button modal__button--add'>Добавить в корзину</button> :
                <>
                  <button data-testid='confirm-delete' ref={buttonRemove} onClick={removeFromCartButtonClickHandle} className='button button--small modal__button'>Удалить товар</button>
                  {container === AppRoute.Catalog ?
                    <button onClick={closeHandle} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</button> :
                    ''}
                  {container === AppRoute.Cart ?
                    <button onClick={followButtonClickHandle} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</button> :
                    ''}
                </>}

          </div>
          <button ref={buttonClose} onClick={container === AppRoute.Cart ? followButtonClickHandle : closeHandle} className='modal__close-btn button-cross' type='button' aria-label='Закрыть'><span className='button-cross__icon'></span><span className='modal__close-btn-interactive-area'></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalToCart;
