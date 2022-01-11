/* eslint-disable no-console */
import { FilterProps } from '../types/filter-type';
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

export const getQueryByFilters = (filters: FilterProps, sort: [SortType, SortType]): string => {
  const queryArray: string[] = [];
  const { guitarType, stringsCount, priceMin, priceMax, } = filters;
  const { isAcustic, isElectro, isUkulele, } = guitarType;
  const { isFour, isSix, isSeven, isTwelve, } = stringsCount;
  const [byType, byDirection] = sort;

  if (isAcustic) {
    queryArray.push('type=acoustic&');
  }
  if (isElectro) {
    queryArray.push('type=electric&');
  }
  if (isUkulele) {
    queryArray.push('type=ukulele&');
  }
  if (isFour) {
    queryArray.push('stringCount=4&');
  }
  if (isSix) {
    queryArray.push('stringCount=6&');
  }
  if (isSeven) {
    queryArray.push('stringCount=7&');
  }
  if (isTwelve) {
    queryArray.push('stringCount=12&');
  }
  queryArray.push(`price_gte=${priceMin}&price_lte=${priceMax}&`);
  if (byDirection === SortType.Default) {
    return queryArray.join('');
  }
  switch (byType) {
    case SortType.Price:
      if (byDirection === SortType.Ascending) {
        queryArray.push('sort=price&order=asc');
      }
      queryArray.push('sort=price&order=desc');
      break;
    case SortType.Popular:
      if (byDirection === SortType.Ascending) {
        queryArray.push('sort=popular&order=asc');
      }
      queryArray.push('sort=popular&order=desc');
      break;
  }
  return queryArray.join('');
};
