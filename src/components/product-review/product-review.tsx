import { CommentProps } from '../../types/comment-type';
import { AppRoute } from '../../utils/const';
import ProductRate from '../product-rate/product-rate';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export type ProductReviewProps = {
  review: CommentProps,
}

function ProductReview({ review, }: ProductReviewProps): JSX.Element {
  return (
    <div className='review'>
      <div className='review__wrapper'>
        <h4 className='review__title review__title--author title title--lesser'>{review.userName}</h4><span className='review__date'>{dayjs(review.createAt).locale('ru').format('DD MMMM')}</span>
      </div>
      <ProductRate rating={review.rating} ratingsCount={''} route={AppRoute.Reviews} />
      <h4 className='review__title title title--lesser'>Достоинства:</h4>
      <p className='review__value'>{review.advantage}</p>
      <h4 className='review__title title title--lesser'>Недостатки:</h4>
      <p className='review__value'>{review.disadvantage}</p>
      <h4 className='review__title title title--lesser'>Комментарий:</h4>
      <p className='review__value'>{review.comment}</p>
    </div>
  );
}

export default ProductReview;
