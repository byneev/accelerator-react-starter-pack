import { GuitarType, StringsCount } from '../utils/const';

export type FilterProps = {
  priceMin: number;
  priceMax: number;
  stringsCount: StringsCount | null;
  guitarType: GuitarType | null;
};
