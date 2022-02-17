import { ChangeEvent, MouseEvent, MutableRefObject, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsModalReviewOpen } from '../../store/actions';
import { sendReviewToServer } from '../../store/api-actions';
import { CommentPostProps, CommentProps } from '../../types/comment-type';
import { ProductProps } from '../../types/product-type';
import { DEFAULT_REVIEWS_COUNT } from '../../utils/const';

export type ModalReviewProps = {
  product: ProductProps,
  reviews: CommentProps[]
}

function ModalReview({ product, reviews, }: ModalReviewProps): JSX.Element {
  const dispatch = useDispatch();
  const userName = useRef<HTMLInputElement>(null);
  const advantage = useRef<HTMLInputElement>(null);
  const disadvantage = useRef<HTMLInputElement>(null);
  const comment = useRef<HTMLTextAreaElement>(null);
  const [currentRating, setCurrentRating] = useState(DEFAULT_REVIEWS_COUNT);

  const changeRateRadiobuttonHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    if (evt.target.checked) {
      setCurrentRating(+evt.target.value);
    }
  };

  const closeButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(setIsModalReviewOpen(false));
  };

  const submitButtonClickHandle = (evt: MouseEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const currentComment: CommentPostProps = {
      guitarId: product.id,
      userName: userName.current ? userName.current.value : '',
      advantage: advantage.current ? advantage.current.value : '',
      disadvantage: disadvantage.current ? disadvantage.current.value : '',
      comment: comment.current ? comment.current.value : '',
      rating: currentRating,
    };
    dispatch(sendReviewToServer(currentComment));
  };

  return (
    <div className='modal is-active modal--review'>
      <div className='modal__wrapper'>
        <div className='modal__overlay' data-close-modal></div>
        <div className='modal__content'>
          <h2 className='modal__header modal__header--review title title--medium'>Оставить отзыв</h2>
          <h3 className='modal__product-name title title--medium-20 title--uppercase'>{product.name}</h3>
          <form onSubmit={submitButtonClickHandle} className='form-review'>
            <div className='form-review__wrapper'>
              <div className='form-review__name-wrapper'>
                <label className='form-review__label form-review__label--required' htmlFor='user-name'>Ваше Имя</label>
                <input ref={userName} className='form-review__input form-review__input--name' id='user-name' type='text' autoComplete='off' /><span className='form-review__warning'>Заполните поле</span>
              </div>
              <div>
                <span className='form-review__label form-review__label--required'>Ваша Оценка</span>
                <div className='rate rate--reverse'>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-5' name='rate' value='5' />
                  <label className='rate__label' htmlFor='star-5' title='Отлично'></label>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-4' name='rate' value='4' />
                  <label className='rate__label' htmlFor='star-4' title='Хорошо'></label>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-3' name='rate' value='3' />
                  <label className='rate__label' htmlFor='star-3' title='Нормально'></label>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-2' name='rate' value='2' />
                  <label className='rate__label' htmlFor='star-2' title='Плохо'></label>
                  <input onChange={changeRateRadiobuttonHandle} className='visually-hidden' type='radio' id='star-1' name='rate' value='1' />
                  <label className='rate__label' htmlFor='star-1' title='Ужасно'></label><span className='rate__count'>{reviews.length}</span><span className='rate__message'>Поставьте оценку</span>
                </div>
              </div>
            </div>
            <label className='form-review__label' htmlFor='user-name'>Достоинства</label>
            <input ref={advantage} className='form-review__input' id='pros' type='text' autoComplete='off' />
            <label className='form-review__label' htmlFor='user-name'>Недостатки</label>
            <input ref={disadvantage} className='form-review__input' id='user-name' type='text' autoComplete='off' />
            <label className='form-review__label' htmlFor='user-name'>Комментарий</label>
            <textarea ref={comment} className='form-review__input form-review__input--textarea' id='user-name' rows={10} autoComplete='off'></textarea>
            <button className='button button--medium-20 form-review__button' type='submit'>Отправить отзыв</button>
          </form>
          <button onClick={closeButtonClickHandle} className='modal__close-btn button-cross' type='button' aria-label='Закрыть'>
            <span className='button-cross__icon'></span>
            <span className='modal__close-btn-interactive-area'></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalReview;
