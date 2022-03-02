import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCartGuitars, removeFromCartGuitars, setIsModalToCartOpen, setIsModalToCartSuccessOpen } from '../../store/actions';
import { getCartGuitars } from '../../store/selectors';
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
  const isInCart = cartGuitars.includes(product);

  const toCartButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(addToCartGuitars(product));
    dispatch(setIsModalToCartSuccessOpen(true));
  };

  const removeFromCartButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(removeFromCartGuitars(product));
  };

  const closeHandle = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setIsModalToCartOpen(false));
  };

  return (
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
          {isInCart ?
            <>
              <button onClick={removeFromCartButtonClickHandle} className='button button--small modal__button'>Удалить товар</button>
              {container === AppRoute.Guitars ?
                <Link to={`${AppRoute.Catalog}/1`} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</Link> :
                <button onClick={closeHandle} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</button>}
            </> :
            <button onClick={toCartButtonClickHandle} className='button button--red button--big modal__button modal__button--add'>Добавить в корзину</button>}
        </div>
        <button onClick={closeHandle} className='modal__close-btn button-cross' type='button' aria-label='Закрыть'><span className='button-cross__icon'></span><span className='modal__close-btn-interactive-area'></span>
        </button>
      </div>
    </div>
  );
}

export default ModalToCart;
