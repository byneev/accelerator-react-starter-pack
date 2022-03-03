import { KeyboardEvent, MouseEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsModalToCartOpen, setIsModalToCartSuccessOpen } from '../../store/actions';
import { cartReducer } from '../../store/reducers/cart-reducer';
import { getLastQuantity } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { AppRoute } from '../../utils/const';

export type ModalCartSuccessProps = {
  product: ProductProps;
  container: AppRoute;
}

function ModalCartSuccess({ container, product, }: ModalCartSuccessProps): JSX.Element {
  const dispatch = useDispatch();
  const buttonClose = useRef<HTMLButtonElement>(null);
  const buttonToCart = useRef<HTMLAnchorElement>(null);

  const closeHandle = (evt: MouseEvent<HTMLElement>) => {
    dispatch(setIsModalToCartSuccessOpen(false));
  };

  const tabKeydownHandle = (evt: KeyboardEvent) => {
    if (evt.key === 'Tab') {
      if (document.activeElement === buttonClose.current) {
        buttonToCart.current && buttonToCart.current.focus();
        evt.preventDefault();
      }
    }
  };

  const followButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    dispatch(setIsModalToCartOpen(false));
    dispatch(setIsModalToCartSuccessOpen(false));
  };

  return (
    <div className='modal is-active modal--success'>
      <div onKeyDown={tabKeydownHandle} className='modal__wrapper'>
        <div className='modal__overlay' data-close-modal></div>
        <div className='modal__content'>
          <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
            <use xlinkHref='#icon-success'></use>
          </svg>
          <p className='modal__message'>Товар успешно добавлен в корзину</p>
          <div className='modal__button-container modal__button-container--add'>
            <Link ref={buttonToCart} onClick={closeHandle} to={AppRoute.Cart} className='button button--small modal__button'>Перейти в корзину</Link>
            {container === AppRoute.Catalog ?
              <button onClick={closeHandle} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</button> :
              ''}

            {container === AppRoute.Guitars ?
              <Link to={`${AppRoute.Catalog}/1`} onClick={closeHandle} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</Link> :
              ''}

            {/* {container === AppRoute.Cart ?
              <button onClick={followButtonClickHandle} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</button> :
              ''} */}
          </div>
          <button ref={buttonClose} onClick={closeHandle} className='modal__close-btn button-cross' type='button' aria-label='Закрыть'><span className='button-cross__icon'></span><span className='modal__close-btn-interactive-area'></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCartSuccess;
