/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { setCurrentFilters, setIsFilterDefault } from '../../store/actions';
import { initialState } from '../../store/reducer';
import { getPriceRangeUkulele, getPriceRangeAcoustic, getPriceRangeElectric, getPriceRangeAll } from '../../store/selectors';
import { PriceRangeProps } from '../../types/price-range-type';
import { AppRoute } from '../../utils/const';
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
  const history = useHistory();

  useEffect(() => {
    const actualPriceMin: string = priceMin === '' || priceMin < actualPriceRange.min ? actualPriceRange.min : priceMin;
    const actualPriceMax: string = priceMax === '' || priceMax > actualPriceRange.max ? actualPriceRange.max : priceMax;
    console.log(priceMin);
    console.log(priceMax);
    if (+actualPriceMax > +actualPriceMin) {
      console.log('I am here');
      dispatch(setIsFilterDefault(false));
      dispatch(setCurrentFilters({ guitarType, stringsCount, priceMin: actualPriceMin, priceMax: actualPriceMax, }));
    }
  }, [actualPriceRange, dispatch, guitarType, priceMax, priceMin, stringsCount]);

  useEffect(() => {
    if (!Object.values(guitarType).includes(true)) {
      setActualPriceRange(priceRangeAll);
    } else {
      if (guitarType.isUkulele) {
        if (guitarType.isElectro) {
          if (guitarType.isAcustic) {
            setActualPriceRange(priceRangeAll);
          } else {
            setActualPriceRange({
              min: priceRangeUkulele.min,
              max: priceRangeElectric.max,
            });
          }
        } else if (guitarType.isAcustic) {
          setActualPriceRange(priceRangeAcoustic);
        } else {
          setActualPriceRange(priceRangeUkulele);
        }
      } else {
        if (guitarType.isElectro) {
          if (guitarType.isAcustic) {
            setActualPriceRange({
              min: priceRangeAcoustic.min,
              max: priceRangeElectric.max,
            });
          } else {
            setActualPriceRange(priceRangeElectric);
          }
        } else {
          setActualPriceRange(priceRangeAcoustic);
        }
      }
    }
  }, [guitarType, priceRangeAcoustic, priceRangeAll, priceRangeElectric, priceRangeUkulele]);

  const changeGuitarTypeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const name = evt.target.name;
    switch (name) {
      case 'acoustic':
        setGuitarType({ ...guitarType, isAcustic: isChecked, });
        break;
      case 'electric':
        setGuitarType({ ...guitarType, isElectro: isChecked, });
        break;
      case 'ukulele':
        setGuitarType({ ...guitarType, isUkulele: isChecked, });
        break;
    }
    history.push(AppRoute.Main);
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
    history.push(AppRoute.Main);
  };

  const priceMinChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (+value >= 0) {
      setPriceMin(value);
      history.push(AppRoute.Main);
    }
  };

  const priceMaxChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (+value >= 0) {
      setPriceMax(value);
      history.push(AppRoute.Main);
    }
  };

  const priceMinResetHandle = () => {
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
