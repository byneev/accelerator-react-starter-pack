
import { toast } from 'react-toastify';
import { CommentPostProps } from '../types/comment-type';
import { DefaultFunctionProps } from '../types/default-function-type';
import { FilterProps } from '../types/filter-type';
import { ProductProps } from '../types/product-type';
import { BASIC_DELAY, SortType } from './const';


export const getArrayByNumber = (start: number, end: number) => {
  let num = start;
  const result: string[] = [];
  while (num !== end + 1) {
    result.push(String(num++));
  }
  return result;
};


export const getRange = (pagesCount: number, currentPage: number): string[] => {
  let range: string[] = [];
  if (pagesCount === 1) {
    range = ['1'];
  }
  const shouldShowPrevious = currentPage !== 1 && pagesCount > 1;
  const shouldShowNext = currentPage !== pagesCount && pagesCount > 1;
  const delta = currentPage === 1 ? 2 : 1;

  if (shouldShowPrevious && !shouldShowNext) {
    range = ['Назад', ...getArrayByNumber(Math.max(currentPage - 2, 1), Math.min(currentPage + delta, pagesCount))];
  }
  if (!shouldShowPrevious && shouldShowNext) {
    range = [...getArrayByNumber(Math.max(currentPage - 1, 1), Math.min(currentPage + delta, pagesCount)), 'Далее'];
  }
  if (shouldShowPrevious && shouldShowNext) {
    range = ['Назад', ...getArrayByNumber(currentPage - 1, currentPage + 1), 'Далее'];
  }
  return range;
};


export const getQueryByFilters = (filters: FilterProps | null, sort: [SortType, SortType]): string => {
  const queryArray: string[] = ['?'];
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


export const debounce = (func: DefaultFunctionProps, timeout = 300) => {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this); }, timeout);
  };
};


export const error404Warn = debounce(() => toast.warn('Page not found. Input correct url.'), BASIC_DELAY);


export const error400Warn = debounce(() => toast.warn('Bad request. Pass correct request.'), BASIC_DELAY);


export const error401Warn = debounce(() => toast.warn('You are unauthorized. Please, login to cite'), BASIC_DELAY);


export const errorGte503Warn = debounce(() => toast.warn('Service unavalaible. Try again later.'), BASIC_DELAY);

export const errorBadFiltersWarn = debounce(() => toast.warn('Cannot find products by this filters. Filters were set to default values.'), BASIC_DELAY / 3);


export const checkIsOnline = () => {
  if (!window.navigator.onLine) {
    toast.warn('You’re offline. Check your connection.');
  }
};

export const validateComment = (comment: CommentPostProps): CommentPostProps => ({
  ...comment,
  advantage: comment.advantage === '' ? 'Нет' : comment.advantage,
  disadvantage: comment.disadvantage === '' ? 'Нет' : comment.disadvantage,
  comment: comment.comment === '' ? 'Комментарий остуствует' : comment.comment,
});

export const getCorrectImgURL = (product: ProductProps): string => {
  const [img, adress] = product.previewImg.split('/');
  return [img, '/content/', adress].join('');
};
