import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsModalToCartSuccessOpen } from '../../store/actions';
import { AppRoute } from '../../utils/const';

export type ModalCartSuccessProps = {
  container: AppRoute
}

function ModalCartSuccess({ container, }: ModalCartSuccessProps): JSX.Element {
  const dispatch = useDispatch();

  const closeHandle = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(setIsModalToCartSuccessOpen(false));
  };

  return (
    <div className='modal__wrapper'>
      <div className='modal__overlay' data-close-modal></div>
      <div className='modal__content'>
        <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
          <use xlinkHref='#icon-success'></use>
        </svg>
        <p className='modal__message'>Товар успешно добавлен в корзину</p>
        <div className='modal__button-container modal__button-container--add'>
          <Link to={AppRoute.Cart} className='button button--small modal__button'>Перейти в корзину</Link>
          {container === AppRoute.Guitars ?
            <button onClick={closeHandle} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</button> :
            <Link to={`${AppRoute.Catalog}/1`} className='button button--black-border button--small modal__button modal__button--right'>Продолжить покупки</Link>}
        </div>
        <button onClick={closeHandle} className='modal__close-btn button-cross' type='button' aria-label='Закрыть'><span className='button-cross__icon'></span><span className='modal__close-btn-interactive-area'></span>
        </button>
      </div>
    </div>
  );
}

export default ModalCartSuccess;
