/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFilters, setIsFilterDefault } from '../../store/actions';
import { initialState } from '../../store/reducer';
import { getMinPrice, getMaxPrice } from '../../store/selectors';
import FilterPrice from '../filter-price/filter-price';
import FilterStrings from '../filter-strings/filter-strings';
import FilterType from '../filter-type/filter-type';

function FormFilter(): JSX.Element {
  const [guitarType, setGuitarType] = useState(initialState.currentFilters.guitarType);
  const [stringsCount, setStringsCount] = useState(initialState.currentFilters.stringsCount);
  const priceMinGlobal = useSelector(getMinPrice);
  const priceMaxGlobal = useSelector(getMaxPrice);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (priceMin !== '' && priceMax !== '' && priceMin >= priceMinGlobal && priceMax <= priceMaxGlobal) {
      dispatch(setIsFilterDefault(false));
      dispatch(setCurrentFilters({ guitarType, stringsCount, priceMin, priceMax, }));
    }
  }, [dispatch, guitarType, priceMax, priceMaxGlobal, priceMin, priceMinGlobal, stringsCount]);

  const changeGuitarTypeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const name = evt.target.name;
    switch (name) {
      case 'acustic':
        setGuitarType({ ...guitarType, isAcustic: isChecked, });
        break;
      case 'electric':
        setGuitarType({ ...guitarType, isElectro: isChecked, });
        break;
      case 'ukulele':
        setGuitarType({ ...guitarType, isUkulele: isChecked, });
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
    if (+value > 0) {
      setPriceMin(value);
    }
  };

  const priceMaxChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    if (+value > 0) {
      setPriceMax(value);
    }
  };

  const priceMinResetHandle = () => {
    if (priceMin <= priceMinGlobal) {
      setPriceMin(priceMinGlobal);
    }
  };

  const priceMaxResetHandle = () => {
    if (priceMax >= priceMaxGlobal) {
      setPriceMax(priceMaxGlobal);
    }
  };

  return (
    <form className='catalog-filter'>
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <FilterPrice priceMin={priceMin} priceMax={priceMax} onChangePriceMin={priceMinChangeHandle} onChangePriceMax={priceMaxChangeHandle} onBlurPriceMin={priceMinResetHandle} onBlurPriceMax={priceMaxResetHandle} />
      <FilterType guitarType={guitarType} onChangeGuitarType={changeStringsCountHandle} />
      <FilterStrings guitarType={guitarType} stringsCount={stringsCount} onChangeStringCount={changeGuitarTypeHandle} />
    </form>
  );
}

export default FormFilter;
