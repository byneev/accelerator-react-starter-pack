/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setCurrentFilters, setCurrentPage, setIsInnerChange, setStartRange } from '../../store/actions';
import { getRangeByQuery } from '../../store/api-actions';
import { getPriceRangeAll, getGuitars, getCurrentSort, getCurrentPage, getCurrentFilters, getIsInnerChange } from '../../store/selectors';
import { AppRoute } from '../../utils/const';
import { getQueryByFilters } from '../../utils/helpers';
import FilterPrice from '../filter-price/filter-price';
import FilterStrings from '../filter-strings/filter-strings';
import FilterType from '../filter-type/filter-type';

function FormFilter(): JSX.Element {
  const isInnerChange = useSelector(getIsInnerChange);
  const currentFilters = useSelector(getCurrentFilters);
  const actualPriceRange = useSelector(getPriceRangeAll);
  const guitars = useSelector(getGuitars);
  const sort = useSelector(getCurrentSort);
  const currentPage = useSelector(getCurrentPage);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const currentQuery = getQueryByFilters(currentFilters, sort);
    dispatch(getRangeByQuery(currentQuery));
  }, [currentFilters.guitarType]);

  useEffect(() => {
    if (Object.values(currentFilters.stringsCount).includes(true)
      && Object.values(currentFilters.guitarType).includes(true)
      && guitars.length === 0) {
      dispatch(setCurrentFilters({
        ...currentFilters, stringsCount: {
          isFour: false,
          isSix: false,
          isSeven: false,
          isTwelve: false,
        },
      }));
      const currentQuery = getQueryByFilters({
        ...currentFilters, stringsCount: {
          isFour: false,
          isSix: false,
          isSeven: false,
          isTwelve: false,
        },
      }, sort);
      history.push(`${AppRoute.Catalog}/${currentPage}${currentQuery}`);
    }
  }, [currentFilters, dispatch, guitars.length]);

  useEffect(() => {
    if (isInnerChange) {
      const currentQuery = getQueryByFilters({ ...currentFilters, priceMin: currentFilters.priceMin, priceMax: currentFilters.priceMax, }, sort);
      console.log(currentQuery);
      history.push(`${AppRoute.Catalog}/${currentPage}${currentQuery}`);
    }
  }, [currentPage, sort, currentFilters.stringsCount, currentFilters.priceMin, currentFilters.priceMax, actualPriceRange, history, dispatch]);

  const changeGuitarTypeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const isChecked = evt.target.checked;
    dispatch(setCurrentPage('1'));
    switch (name) {
      case 'acoustic':
        dispatch(setCurrentFilters({
          ...currentFilters, guitarType: {
            ...currentFilters.guitarType, isAcustic: isChecked,
          },
        }));
        break;
      case 'electric':
        dispatch(setCurrentFilters({
          ...currentFilters, guitarType: {
            ...currentFilters.guitarType, isElectro: isChecked,
          },
        }));
        break;
      case 'ukulele':
        dispatch(setCurrentFilters({
          ...currentFilters, guitarType: {
            ...currentFilters.guitarType, isUkulele: isChecked,
          },
        }));
        break;
    }
  };

  const changeStringsCountHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const name = evt.target.name;
    dispatch(setIsInnerChange(true));
    dispatch(setCurrentPage('1'));
    switch (name) {
      case '4-strings':
        dispatch(setCurrentFilters({
          ...currentFilters, stringsCount: {
            ...currentFilters.stringsCount, isFour: isChecked,
          },
        }));
        break;
      case '6-strings':
        dispatch(setCurrentFilters({
          ...currentFilters, stringsCount: {
            ...currentFilters.stringsCount, isSix: isChecked,
          },
        }));
        break;
      case '7-strings':
        dispatch(setCurrentFilters({
          ...currentFilters, stringsCount: {
            ...currentFilters.stringsCount, isSeven: isChecked,
          },
        }));
        break;
      case '12-strings':
        dispatch(setCurrentFilters({
          ...currentFilters, stringsCount: {
            ...currentFilters.stringsCount, isTwelve: isChecked,
          },
        }));
        break;
    }
  };

  const priceMinChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    dispatch(setCurrentPage('1'));
    dispatch(setIsInnerChange(true));
    dispatch(setCurrentFilters({
      ...currentFilters, priceMin: value,
    }));

  };

  const priceMaxChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    dispatch(setCurrentPage('1'));
    dispatch(setIsInnerChange(true));
    dispatch(setCurrentFilters({
      ...currentFilters, priceMax: value,
    }));
  };

  const priceMinResetHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    dispatch(setIsInnerChange(true));
    if (currentFilters.priceMin !== '') {
      if (+value < +actualPriceRange.min || +value > +actualPriceRange.max || (+value > +currentFilters.priceMax && currentFilters.priceMax !== '')) {
        dispatch(setCurrentFilters({ ...currentFilters, priceMin: actualPriceRange.min, }));
      }
    }
  };

  const priceMaxResetHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    dispatch(setIsInnerChange(true));
    if (currentFilters.priceMax !== '') {
      if (+value > +actualPriceRange.max || +value < +actualPriceRange.min || (+value < +currentFilters.priceMin && currentFilters.priceMin !== '')) {
        dispatch(setCurrentFilters({ ...currentFilters, priceMax: actualPriceRange.max, }));
      }
    }
  };

  return (
    <form className='catalog-filter'>
      <h2 className='title title--bigger catalog-filter__title'>Фильтр</h2>
      <FilterPrice priceMin={currentFilters.priceMin} priceMax={currentFilters.priceMax} onChangePriceMin={priceMinChangeHandle} onChangePriceMax={priceMaxChangeHandle} onBlurPriceMin={priceMinResetHandle} onBlurPriceMax={priceMaxResetHandle} />
      <FilterType guitarType={currentFilters.guitarType} onChangeGuitarType={changeGuitarTypeHandle} />
      <FilterStrings onChangeStringCount={changeStringsCountHandle} />
    </form>
  );
}

export default FormFilter;
