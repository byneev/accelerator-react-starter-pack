import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setIsModalReviewSuccessOpen } from '../../store/actions';
import { ProductProps } from '../../types/product-type';
import { AppRoute } from '../../utils/const';

function ModalSuccessReview(): JSX.Element {
  const dispatch = useDispatch();

  const buttonCloseClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsModalReviewSuccessOpen(false));
  };

  return (
    <div className='modal is-active modal--success'>
      <div className='modal__wrapper'>
        <div className='modal__overlay' data-close-modal></div>
        <div className='modal__content'>
          <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
            <use xlinkHref='#icon-success'></use>
          </svg>
          <p className='modal__message'>Спасибо за ваш отзыв!</p>
          <div className='modal__button-container modal__button-container--review'>
            <button onClick={buttonCloseClickHandle} className='button button--small modal__button modal__button--review'>К покупкам!</button>
          </div>
          <button onClick={buttonCloseClickHandle} className='modal__close-btn button-cross' type='button' aria-label='Закрыть'><span className='button-cross__icon'></span><span className='modal__close-btn-interactive-area'></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessReview;
