/* eslint-disable no-console */
import { ProductProps } from '../types/product-type';
import { SortType } from './const';

export const getArrayByNumber = (max: number) => {
  let num = 0;
  const result: string[] = [];
  while (num !== max) {
    num++;
    result.push(String(num));
  }
  return result;
};


export const getSortedArrayByContext = (guitars: ProductProps[], sort: [SortType, SortType]): ProductProps[] => {
  const result = guitars.slice();
  const [byType, byDirection] = sort;
  if (byDirection === SortType.Default) {
    return result;
  }
  switch (byType) {
    case SortType.Price:
      if (byDirection === SortType.Ascending) {
        return result.sort((a, b) => a.price - b.price);
      }
      return result.sort((a, b) => b.price - a.price);
    case SortType.Popular:
      if (byDirection === SortType.Ascending) {
        return result.sort((a, b) => a.rating - b.rating);
      }
      return result.sort((a, b) => b.rating - a.rating);
    default:
      return result;
  }
};
