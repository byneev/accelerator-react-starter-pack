import React, { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalReviewOpen } from '../../store/actions';
import { getCommentsFromServer } from '../../store/api-actions';
import { getSortedReviews } from '../../store/selectors';
import { CommentProps } from '../../types/comment-type';
import { DEFAULT_REVIEWS_COUNT } from '../../utils/const';
import ProductReview from '../product-review/product-review';
import ReviewMoreButton from '../reviews-more-button/reviews-more-button';

export type ProductReviewsListProps = {
  id: number,
}

function ProductReviewsList({ id, }: ProductReviewsListProps): JSX.Element {
  const dispatch = useDispatch();
  const reviews = useSelector(getSortedReviews);
  const [startReviewNumber, setStartReviewNumber] = useState(0);

  useEffect(() => {
    dispatch(getCommentsFromServer(id));
  }, [dispatch, id]);

  const moreButtonClickHandle = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setStartReviewNumber((prev) => prev + DEFAULT_REVIEWS_COUNT);
  };

  const sendReviewButtonClickHandle = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(setIsModalReviewOpen(true));
  };

  return (
    <section className='reviews' >
      <h3 className='reviews__title title title--bigger'>Отзывы</h3>
      <a onClick={sendReviewButtonClickHandle} className='button button--red-border button--big reviews__sumbit-button' href=''>Оставить отзыв</a>
      {reviews.length !== 0 && reviews.slice(0, startReviewNumber + DEFAULT_REVIEWS_COUNT).map((review: CommentProps) =>
        (<ProductReview key={review.id} review={review} />))}
      {startReviewNumber + DEFAULT_REVIEWS_COUNT < reviews.length && <ReviewMoreButton onMoreClick={moreButtonClickHandle} />}
      {reviews.length !== 0 && <a className='button button--up button--red-border button--big reviews__up-button' href='#header'>Наверх</a>}
    </section>
  );
}

export default ProductReviewsList;
