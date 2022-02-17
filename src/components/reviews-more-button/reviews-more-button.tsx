import { MouseEvent } from 'react';

export type ReviewMoreButtonProps = {
  onMoreClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}

function ReviewMoreButton({ onMoreClick, }: ReviewMoreButtonProps): JSX.Element {
  return (
    <button onClick={onMoreClick} className='button button--medium reviews__more-button'>Показать еще отзывы</button>
  );
}

export default ReviewMoreButton;
