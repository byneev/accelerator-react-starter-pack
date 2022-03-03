import { InitialStateAppProps } from '../store/reducers/app-reducer';
import { InitialStateUserProps } from '../store/reducers/user-reducer';
import { CommentPostProps, CommentProps } from '../types/comment-type';
import { ProductProps } from '../types/product-type';
import { SortType, PRODUCTS_LIMIT_ON_PAGE, CurrentTab } from './const';
import { getArrayByNumber } from './helpers';

export const getMockProduct = (): ProductProps => ({
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description:
    'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
  previewImg: 'img/content/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
});

export const getMockReview = (): CommentProps => ({
  id: '1',
  userName: 'Oleg',
  advantage: 'Nice sound',
  disadvantage: 'Bad appereance',
  comment: 'Nice one!',
  rating: 4,
  createAt: 'iPhone 5s',
  guitarId: 22,
});

export const getMockPostReview = (): CommentPostProps => ({
  userName: 'Oleg',
  advantage: 'Nice sound',
  disadvantage: 'Bad appereance',
  comment: 'Nice one!',
  rating: 4,
  guitarId: 22,
});

export const getAppStateMock = (): InitialStateAppProps => ({
  guitars: getArrayByNumber(1, 15).map((_item) => getMockProduct()),
  searchedGuitars: [getMockProduct(), getMockProduct(), getMockProduct()],
  priceRangeAll: {
    min: '1700',
    max: '35000',
  },
  reviews: [getMockReview(), getMockReview(), getMockReview(), getMockReview()],
  shouldShowSpinner: false,
  currentTab: CurrentTab.Characteristics,
  currentProduct: getMockProduct(),
  isModalReviewSuccessOpen: false,
  isModalReviewOpen: false,
  reviewsCounts: [],
  isModalToCartOpen: false,
  isModalToCartSuccessOpen: false,
  lastQuantity: 0,
});

export const getUserStateMock = (): InitialStateUserProps => (
  {
    currentSort: [SortType.Price, SortType.Ascending],
    currentFilters: {
      priceMin: '',
      priceMax: '',
      stringsCount: {
        isFour: false,
        isSix: false,
        isSeven: false,
        isTwelve: false,
      },
      guitarType: {
        isAcustic: false,
        isElectro: false,
        isUkulele: false,
      },
    },
    searchQuery: 'x=Ч',
    startRange: 0,
    totalCount: PRODUCTS_LIMIT_ON_PAGE,
    currentPage: '1',
    currentQuery: '',
    searchInput: '',
    cartGuitars: [getMockProduct(), getMockProduct()],
    cartProduct: getMockProduct(),
  }
);


