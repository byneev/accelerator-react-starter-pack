/* eslint-disable no-console */
import { FilterProps } from '../types/filter-type';
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

export const getQueryByFilters = (filters: FilterProps | null, sort: [SortType, SortType]): string => {
  const queryArray: string[] = [];
  if (filters) {
    const { guitarType, stringsCount, priceMin, priceMax, } = filters;
    const { isAcustic, isElectro, isUkulele, } = guitarType;
    const { isFour, isSix, isSeven, isTwelve, } = stringsCount;
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
    if (priceMin !== '' && priceMax !== '') {
      queryArray.push(`price_gte=${priceMin}&price_lte=${priceMax}&`);
    }
  }
  const [byType, byDirection] = sort;
  if (byDirection === SortType.Default) {
    return queryArray.join('');
  }
  switch (byType) {
    case SortType.Price:
      if (byDirection === SortType.Ascending) {
        queryArray.push('_sort=price&_order=asc');
      } else {
        queryArray.push('_sort=price&_order=desc');
      }
      break;
    case SortType.Popular:
      if (byDirection === SortType.Ascending) {
        queryArray.push('_sort=rating&_order=asc');
      } else {
        queryArray.push('_sort=rating&_order=desc');
      }
  }
  return queryArray.join('');
};
