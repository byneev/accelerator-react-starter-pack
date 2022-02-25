import { ChangeEvent, FormEvent, KeyboardEvent as KeyboardEventReact, MouseEvent, SyntheticEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalReviewOpen } from '../../store/actions';
import { sendReviewToServer } from '../../store/api-actions';
import { getIsModalReviewOpen } from '../../store/selectors';
import { CommentPostProps, CommentProps } from '../../types/comment-type';
import { ProductProps } from '../../types/product-type';

export type ModalReviewProps = {
  product: ProductProps,
  reviews: CommentProps[]
}

function ModalReview({ product, reviews, }: ModalReviewProps): JSX.Element {
  const dispatch = useDispatch();
  const isModalReviewOpen = useSelector(getIsModalReviewOpen);
  const userName = useRef<HTMLInputElement>(null);
  const advantage = useRef<HTMLInputElement>(null);
  const disadvantage = useRef<HTMLInputElement>(null);
  const comment = useRef<HTMLTextAreaElement>(null);
  const buttonClose = useRef<HTMLButtonElement>(null);
  const buttonSubmit = useRef<HTMLButtonElement>(null);
  const [checkedButtonValue, setCheckedButtonValue] = useState(0);
  const [hoveredButtonValue, setHoveredButtonValue] = useState(0);
  const [userNameTriesCount, setUserNameTriesCount] = useState(0);
  const [userRateTriesCount, setRateTriesCount] = useState(0);

  const tabKeydownHandle = (evt: KeyboardEventReact) => {
    if (evt.key === 'Tab') {
      if (document.activeElement === buttonClose.current) {
        userName.current && userName.current.focus();
        evt.preventDefault();
      }
    }
  };

  const changeRateRadiobuttonHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      setCheckedButtonValue(+evt.target.value);
    }
  };

  const closeButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (isModalReviewOpen) {
      dispatch(setIsModalReviewOpen(false));
    }
  };

  const outsideModalClickHandle = () => {
    if (isModalReviewOpen) {
      dispatch(setIsModalReviewOpen(false));
    }
  };

  const submitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const currentComment: CommentPostProps = {
      guitarId: product.id,
      userName: userName.current ? userName.current.value : '',
      advantage: advantage.current ? advantage.current.value : '',
      disadvantage: disadvantage.current ? disadvantage.current.value : '',
      comment: comment.current ? comment.current.value : '',
      rating: checkedButtonValue,
    };
    if (currentComment.userName !== '' && currentComment.rating !== 0) {
      dispatch(sendReviewToServer(currentComment));
    }
    if (currentComment.userName === '') {
      setUserNameTriesCount(1);
    } else {
      setUserNameTriesCount(0);
    }
    if (currentComment.rating === 0) {
      setRateTriesCount(1);
    } else {
      setRateTriesCount(0);
    }
  };

  const hoverRateLabelHandle = (evt: SyntheticEvent) => {
    if (!(evt.target instanceof HTMLLabelElement)) {
      return;
    }
    if (evt.target.dataset.id) {
      setHoveredButtonValue(+evt.target.dataset.id);
    }
  };

  const unhoverRateLabelHandle = (evt: MouseEvent<HTMLLabelElement>) => {
    setHoveredButtonValue(0);
  };

  return (
    <div onKeyDown={tabKeydownHandle} className='modal is-active modal--review' tabIndex={2}>
      <div className='modal__wrapper'>
        <div data-testid='overlay' onClick={outsideModalClickHandle} className='modal__overlay' data-close-modal></div>
        <div className='modal__content'>
          <h2 className='modal__header modal__header--review title title--medium'>Оставить отзыв</h2>
          <h3 className='modal__product-name title title--medium-20 title--uppercase'>{product.name}</h3>
          <form onSubmit={submitHandle} className='form-review'>
            <div className='form-review__wrapper'>
              <div className='form-review__name-wrapper'>
                <label className='form-review__label form-review__label--required' htmlFor='user-name'>Ваше Имя</label>
                <input name='name-field' autoFocus ref={userName} className='form-review__input form-review__input--name' id='user-name' type='text' autoComplete='off' />
                {userNameTriesCount > 0 && <span className='form-review__warning'>Заполните поле</span>}
              </div>
              <div>
                <span className='form-review__label form-review__label--required'>Ваша Оценка</span>
                <div className='rate'>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-1' name='rate' value='1' />
                  <label data-id='1' onMouseLeave={unhoverRateLabelHandle} onMouseOver={hoverRateLabelHandle} className={checkedButtonValue >= 1 || hoveredButtonValue >= 1 ? 'rate__label rate__label--full-star' : 'rate__label'} htmlFor='star-1' title='Ужасно'></label>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-2' name='rate' value='2' />
                  <label data-id='2' onMouseLeave={unhoverRateLabelHandle} onMouseOver={hoverRateLabelHandle} className={checkedButtonValue >= 2 || hoveredButtonValue >= 2 ? 'rate__label rate__label--full-star' : 'rate__label'} htmlFor='star-2' title='Плохо'></label>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-3' name='rate' value='3' />
                  <label data-id='3' onMouseLeave={unhoverRateLabelHandle} onMouseOver={hoverRateLabelHandle} className={checkedButtonValue >= 3 || hoveredButtonValue >= 3 ? 'rate__label rate__label--full-star' : 'rate__label'} htmlFor='star-3' title='Нормально'></label>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-4' name='rate' value='4' />
                  <label data-id='4' onMouseLeave={unhoverRateLabelHandle} onMouseOver={hoverRateLabelHandle} className={checkedButtonValue >= 4 || hoveredButtonValue >= 4 ? 'rate__label rate__label--full-star' : 'rate__label'} htmlFor='star-4' title='Хорошо'></label>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-5' name='rate' value='5' />
                  <label data-id='5' onMouseLeave={unhoverRateLabelHandle} onMouseOver={hoverRateLabelHandle} className={checkedButtonValue >= 5 || hoveredButtonValue >= 5 ? 'rate__label rate__label--full-star' : 'rate__label'} htmlFor='star-5' title='Отлично'></label>
                  {userRateTriesCount > 0 && <span className='rate__message'>Поставьте оценку</span>}
                </div>
              </div>
            </div>
            <label className='form-review__label' htmlFor='pros'>Достоинства</label>
            <input ref={advantage} className='form-review__input' id='pros' type='text' autoComplete='off' />
            <label className='form-review__label' htmlFor='cons'>Недостатки</label>
            <input ref={disadvantage} className='form-review__input' id='cons' type='text' autoComplete='off' />
            <label className='form-review__label' htmlFor='comment'>Комментарий</label>
            <textarea ref={comment} className='form-review__input form-review__input--textarea' id='comment' rows={10} autoComplete='off'></textarea>
            <button ref={buttonSubmit} className='button button--medium-20 form-review__button' type='submit'>Отправить отзыв</button>
          </form>
          <button ref={buttonClose} onClick={closeButtonClickHandle} className='modal__close-btn button-cross' type='button' aria-label='Закрыть'>
            <span className='button-cross__icon'></span>
            <span className='modal__close-btn-interactive-area'></span>
          </button>
        </div>
      </div>
    </div >
  );
}

export default ModalReview;
