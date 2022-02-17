export type ProductRateStarProps = {
  isFull: boolean;
  sizes: number[];
};

function ProductRateStar({ isFull, sizes, }: ProductRateStarProps): JSX.Element {
  return (
    <svg width={sizes[0]} height={sizes[1]} aria-hidden='true'>
      <use
        xlinkHref={isFull ? '#icon-full-star' : '#icon-star'}
        data-testid={isFull ? 'full' : 'empty'}
      >
      </use>
    </svg>
  );
}

export default ProductRateStar;
