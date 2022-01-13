export type StringsCountProps = {
  isFour: boolean,
  isSix: boolean,
  isSeven: boolean,
  isTwelve: boolean,
}

export type GuitarsTypeProps = {
  isAcustic: boolean,
  isElectro: boolean,
  isUkulele: boolean,
}

export type FilterProps = {
  priceMin: string;
  priceMax: string;
  stringsCount: StringsCountProps;
  guitarType: GuitarsTypeProps;
};
