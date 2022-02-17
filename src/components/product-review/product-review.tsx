/* eslint-disable no-console */
import { date } from 'faker';
import { CommentProps } from '../../types/comment-type';
import { AppRoute } from '../../utils/const';
import ProductRate from '../product-rate/product-rate';

export type ProductReviewProps = {
  review: CommentProps,
}

function ProductReview({ review, }: ProductReviewProps): JSX.Element {
  console.log(review);
  return (
    <div className='review'>
      <div className='review__wrapper'>
        <h4 className='review__title review__title--author title title--lesser'>{review.userName}</h4><span className='review__date'>{Date.parse(review.createAt)}</span>
      </div>
      <ProductRate rating={review.rating} ratingsCount={''} route={AppRoute.Reviews} />
      <h4 className='review__title title title--lesser'>Достоинства:</h4>
      <p className='review__value'>{review.advantages}</p>
      <h4 className='review__title title title--lesser'>Недостатки:</h4>
      <p className='review__value'>{review.disadvantages}</p>
      <h4 className='review__title title title--lesser'>Комментарий:</h4>
      <p className='review__value'>{review.comment}</p>
    </div>
  );
}

export default ProductReview;
