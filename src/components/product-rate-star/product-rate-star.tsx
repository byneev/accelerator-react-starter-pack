export type ProductRateStarProps = {
  isFull: boolean;
};

function ProductRateStar({ isFull, }: ProductRateStarProps): JSX.Element {
  return (
    <svg width='12' height='11' aria-hidden='true'>
      <use xlinkHref={isFull ? '#icon-full-star' : '#icon-star'}></use>
    </svg>
  );
}

export default ProductRateStar;
