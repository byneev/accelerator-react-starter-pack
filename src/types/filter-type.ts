export type FilterProps = {
  priceMin: string;
  priceMax: string;
  stringsCount: {
    isFour: boolean,
    isSix: boolean,
    isSeven: boolean,
    isTwelve: boolean,
  };
  guitarType: {
    isAcustic: boolean,
    isElectro: boolean,
    isUkulele: boolean,
  };
};
