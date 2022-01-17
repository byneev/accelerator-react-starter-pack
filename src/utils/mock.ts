import { InitialStateAppProps } from '../store/reducers/app-reducer';
import { InitialStateUserProps } from '../store/reducers/user-reducer';
import { ProductProps } from '../types/product-type';
import { SortType, PRODUCTS_LIMIT_ON_PAGE } from './const';
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

export const getAppStateMock = (): InitialStateAppProps => ({
  guitars: getArrayByNumber(1, 15).map((_item) => getMockProduct()),
  searchedGuitars: [getMockProduct(), getMockProduct(), getMockProduct()],
  priceRangeAcoustic: {
    min: '1700',
    max: '14900',
  },
  priceRangeElectric: {
    min: '14900',
    max: '35000',
  },
  priceRangeUkulele: {
    min: '1900',
    max: '6800',
  },
  priceRangeAll: {
    min: '1700',
    max: '35000',
  },
  comments: ['1-5', '2-3', '3-7', '4-2'],
});

export const getUserStateMock = (): InitialStateUserProps => (
  {
    isFilterDefault: true,
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
    searchQuery: '',
    startRange: 0,
    totalCount: PRODUCTS_LIMIT_ON_PAGE,
    currentPage: '1',
  }
);


