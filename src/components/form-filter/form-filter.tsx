/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentPage, setCurrentQuery, setIsFilterDefault, setStartRange } from '../../store/actions';
import { initialStateUser } from '../../store/reducers/user-reducer';
import { getPriceRangeUkulele, getPriceRangeAcoustic, getPriceRangeElectric, getPriceRangeAll, getGuitars, getCurrentSort, getCurrentQuery, getCurrentPage } from '../../store/selectors';
import { PriceRangeProps } from '../../types/price-range-type';
import { AppRoute } from '../../utils/const';
import { getQueryByFilters } from '../../utils/helpers';
import FilterPrice from '../filter-price/filter-price';
import FilterStrings from '../filter-strings/filter-strings';
import FilterType from '../filter-type/filter-type';

function FormFilter(): JSX.Element {
  const [guitarType, setGuitarType] = useState(initialStateUser.currentFilters.guitarType);
  const [stringsCount, setStringsCount] = useState(initialStateUser.currentFilters.stringsCount);
  const priceRangeAcoustic = useSelector(getPriceRangeAcoustic);
  const priceRangeElectric = useSelector(getPriceRangeElectric);
  const priceRangeUkulele = useSelector(getPriceRangeUkulele);
  const priceRangeAll = useSelector(getPriceRangeAll);
  const guitars = useSelector(getGuitars);
  const sort = useSelector(getCurrentSort);
  const currentPage = useSelector(getCurrentPage);
  const currentQuery = useSelector(getCurrentQuery);
  const [actualPriceRange, setActualPriceRange] = useState<PriceRangeProps>(priceRangeAll);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(currentQuery);

  useEffect(() => {
    const actualPriceMin: string = priceMin === '' || +priceMin < +actualPriceRange.min ? actualPriceRange.min : priceMin;
    const actualPriceMax: string = priceMax === '' || +priceMax > +actualPriceRange.max ? actualPriceRange.max : priceMax;
    if (+actualPriceMax >= +actualPriceMin && (priceMin === '' ? +actualPriceMin >= +actualPriceRange.min : +priceMin >= +actualPriceRange.min)) {
      dispatch(setIsFilterDefault(false));
      const queryByFilters = getQueryByFilters({ guitarType, stringsCount, priceMin: actualPriceMin, priceMax: actualPriceMax, }, sort);
      // history.push(`${AppRoute.Catalog}/${currentPage}${queryByFilters}`);
    }
  }, [actualPriceRange, currentPage, dispatch, guitarType, history, priceMax, priceMin, sort, stringsCount]);

  useEffect(() => {
    if (Object.values(stringsCount).includes(true)
      && Object.values(guitarType).includes(true)
      && guitars.length === 0) {
      setStringsCount(initialStateUser.currentFilters.stringsCount);
    }
  }, [guitarType, guitars.length, stringsCount]);

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

  const resetPagination = () => {
    dispatch(setStartRange(0));
    dispatch(setCurrentPage('1'));
    history.push(`${AppRoute.Catalog}/1?${currentQuery}`);
  };

  const changeGuitarTypeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    switch (name) {
      case 'acoustic':
        setGuitarType({ ...guitarType, isAcustic: !guitarType.isAcustic, });
        break;
      case 'electric':
        setGuitarType({ ...guitarType, isElectro: !guitarType.isElectro, });
        break;
      case 'ukulele':
        setGuitarType({ ...guitarType, isUkulele: !guitarType.isUkulele, });
        break;
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
    if (+priceMin <= +actualPriceRange.min) {
      setPriceMin(actualPriceRange.min);
    }
  };

  const priceMaxResetHandle = () => {
    if (+priceMax >= +actualPriceRange.max || +priceMax <= +priceMin) {
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
