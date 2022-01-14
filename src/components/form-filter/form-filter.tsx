/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFilters, setIsFilterDefault } from '../../store/actions';
import { initialState } from '../../store/reducer';
import { getPriceRangeUkulele, getPriceRangeAcoustic, getPriceRangeElectric, getPriceRangeAll } from '../../store/selectors';
import { PriceRangeProps } from '../../types/price-range-type';
import FilterPrice from '../filter-price/filter-price';
import FilterStrings from '../filter-strings/filter-strings';
import FilterType from '../filter-type/filter-type';

function FormFilter(): JSX.Element {
  const [guitarType, setGuitarType] = useState(initialState.currentFilters.guitarType);
  const [stringsCount, setStringsCount] = useState(initialState.currentFilters.stringsCount);
  const priceRangeAcoustic = useSelector(getPriceRangeAcoustic);
  const priceRangeElectric = useSelector(getPriceRangeElectric);
  const priceRangeUkulele = useSelector(getPriceRangeUkulele);
  const priceRangeAll = useSelector(getPriceRangeAll);
  const [actualPriceRange, setActualPriceRange] = useState<PriceRangeProps>(priceRangeAll);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const dispatch = useDispatch();
  console.log(actualPriceRange);

  useEffect(() => {
    const actualPriceMin: string = priceMin === '' || priceMin < actualPriceRange.min ? actualPriceRange.min : priceMin;
    const actualPriceMax: string = priceMax === '' || priceMax < actualPriceRange.max ? actualPriceRange.max : priceMax;
    dispatch(setIsFilterDefault(false));
    dispatch(setCurrentFilters({ guitarType, stringsCount, priceMin: actualPriceMin, priceMax: actualPriceMax, }));
  }, [actualPriceRange.max, actualPriceRange.min, dispatch, guitarType, priceMax, priceMin, stringsCount]);

  useEffect(() => {
    if (!Object.values(guitarType).includes(true)) {
      setActualPriceRange(priceRangeAll);
    }
  }, [guitarType]);

  // const allTypes = Object.keys(guitarType);
  // console.log(allTypes);
  // const types = Object.values(guitarType)
  //   .filter((item) => item === true)
  //   .map((_type, index) => {
  //     console.log(allTypes[index]);
  //     return allTypes[index];
  //   });
  // console.log(types);
  // const minPrices = types.map((item) => {
  //   switch (item) {
  //     case 'isAcustic':
  //       return priceRangeAcoustic.min;
  //     case 'isElectro':
  //       return priceRangeElectric.min;
  //     case 'isUkulele':
  //       return priceRangeUkulele.min;
  //   }
  //   return '';
  // });
  // const maxPrices = types.map((item) => {
  //   switch (item) {
  //     case 'isAcustic':
  //       return priceRangeAcoustic.max;
  //     case 'isElectro':
  //       return priceRangeElectric.max;
  //     case 'isUkulele':
  //       return priceRangeUkulele.max;
  //   }
  //   return '';
  // });
  // (minPrices);
  // console.log(maxPrices);
  // minPrices.sort((a, b) => +a - +b);
  // maxPrices.sort((a, b) => +b - +a);
  // setActualPriceRange({
  //   min: minPrices[0],
  //   max: maxPrices[0],
  // });

  const changeGuitarTypeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const name = evt.target.name;
    switch (name) {
      case 'acoustic':
        setGuitarType({ ...guitarType, isAcustic: isChecked, });
        setActualPriceRange(priceRangeAcoustic);
        break;
      case 'electric':
        setGuitarType({ ...guitarType, isElectro: isChecked, });
        setActualPriceRange(priceRangeElectric);
        break;
      case 'ukulele':
        setGuitarType({ ...guitarType, isUkulele: isChecked, });
        setActualPriceRange(priceRangeUkulele);
        break;
      default:
        setActualPriceRange(priceRangeAll);
    }
  };

  const changeStringsCountHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const name = evt.target.name;
    switch (name) {
      case '4-strings':
        setStringsCount({ ...stringsCount, isFour: isChecked, });
        break;
      case '6-strings':
        setStringsCount({ ...stringsCount, isSix: isChecked, });
        break;
      case '7-strings':
        setStringsCount({ ...stringsCount, isSeven: isChecked, });
        break;
      case '12-strings':
        setStringsCount({ ...stringsCount, isTwelve: isChecked, });
        break;
    }
  };

  const priceMinChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (+value >= 0) {
      setPriceMin(value);
    }
  };

  const priceMaxChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (+value >= 0) {
      setPriceMax(value);
    }
  };

  const priceMinResetHandle = () => {
    console.log(priceMin);
    console.log(actualPriceRange);
    if (+priceMin <= +actualPriceRange.min) {
      setPriceMin(actualPriceRange.min);
    }
  };

  const priceMaxResetHandle = () => {
    if (+priceMax >= +actualPriceRange.max) {
      setPriceMax(actualPriceRange.max);
    }
  };

  return (
    <form className='catalog-filter'>
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <FilterPrice priceMin={priceMin} priceMax={priceMax} actualPriceRange={actualPriceRange} onChangePriceMin={priceMinChangeHandle} onChangePriceMax={priceMaxChangeHandle} onBlurPriceMin={priceMinResetHandle} onBlurPriceMax={priceMaxResetHandle} />
      <FilterType guitarType={guitarType} onChangeGuitarType={changeGuitarTypeHandle} />
      <FilterStrings guitarType={guitarType} stringsCount={stringsCount} onChangeStringCount={changeStringsCountHandle} />
    </form>
  );
}

export default FormFilter;
