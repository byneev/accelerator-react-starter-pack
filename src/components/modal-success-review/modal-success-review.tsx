import { KeyboardEvent, MouseEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalReviewSuccessOpen } from '../../store/actions';
import { getIsModalReviewSuccessOpen } from '../../store/selectors';

function ModalSuccessReview(): JSX.Element {
  const dispatch = useDispatch();
  const isModalReviewSuccessOpen = useSelector(getIsModalReviewSuccessOpen);
  const submitButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const tabKeydownHandle = (evt: KeyboardEvent) => {
    if (evt.key === 'Tab') {
      if (document.activeElement === submitButton.current) {
        closeButton.current && closeButton.current.focus();
        evt.preventDefault();
      }
    }
  };

  const closeButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (isModalReviewSuccessOpen) {
      dispatch(setIsModalReviewSuccessOpen(false));
    }
  };

  const outsideModalClickHandle = () => {
    if (isModalReviewSuccessOpen) {
      dispatch(setIsModalReviewSuccessOpen(false));
    }
  };

  return (
    <div onKeyDown={tabKeydownHandle} className='modal is-active modal--success'>
      <div className='modal__wrapper'>
        <div onClick={outsideModalClickHandle} className='modal__overlay' data-close-modal></div>
        <div className='modal__content'>
          <svg className='modal__icon' width='26' height='20' aria-hidden='true'>
            <use xlinkHref='#icon-success'></use>
          </svg>
          <p className='modal__message'>Спасибо за ваш отзыв!</p>
          <div className='modal__button-container modal__button-container--review'>
            <button ref={closeButton} autoFocus onClick={closeButtonClickHandle} className='button button--small modal__button modal__button--review'>К покупкам!</button>
          </div>
          <button data-testid='success-close' ref={submitButton} onClick={closeButtonClickHandle} className='modal__close-btn button-cross' type='button' aria-label='Закрыть'><span className='button-cross__icon'></span><span className='modal__close-btn-interactive-area'></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalSuccessReview;
