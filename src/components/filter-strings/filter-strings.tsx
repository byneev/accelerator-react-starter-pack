/* eslint-disable no-console */
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFilters, setIsFilterDefault } from '../../store/actions';
import { getCurrentFilters, getIsFilterDefault } from '../../store/selectors';

function FilterStrings(): JSX.Element {
  const isFilterDefault = useSelector(getIsFilterDefault);
  const filters = useSelector(getCurrentFilters);
  const { isFour, isSix, isSeven, isTwelve, } = filters.stringsCount;
  const { isAcustic, isElectro, isUkulele, } = filters.guitarType;
  const stringsCount = filters.stringsCount;

  const dispatch = useDispatch();

  const changeStringsCountHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    dispatch(setIsFilterDefault(false));
    switch (name) {
      case '4-strings':
        dispatch(setCurrentFilters({ ...filters, stringsCount: { ...stringsCount, isFour: !isFour, }, }));
        break;
      case '6-strings':
        dispatch(setCurrentFilters({ ...filters, stringsCount: { ...stringsCount, isSix: !isSix, }, }));
        break;
      case '7-strings':
        dispatch(setCurrentFilters({ ...filters, stringsCount: { ...stringsCount, isSeven: !isSeven, }, }));
        break;
      case '12-strings':
        dispatch(setCurrentFilters({ ...filters, stringsCount: { ...stringsCount, isTwelve: !isTwelve, }, }));
        break;
    }
  };

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Количество струн</legend>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          onInput={changeStringsCountHandle}
          className='visually-hidden'
          type='checkbox'
          id='4-strings'
          name='4-strings'
          defaultChecked={isFour}
          disabled={isFilterDefault ? false : (!isUkulele && !isElectro)}
        />
        <label htmlFor='4-strings'>4</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          onChange={changeStringsCountHandle}
          className='visually-hidden'
          type='checkbox'
          id='6-strings'
          name='6-strings'
          defaultChecked={isSix}
          disabled={isFilterDefault ? false : (!isAcustic && !isElectro)}
        />
        <label htmlFor='6-strings'>6</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          onChange={changeStringsCountHandle}
          className='visually-hidden'
          type='checkbox'
          id='7-strings'
          name='7-strings'
          defaultChecked={isSeven}
          disabled={isFilterDefault ? false : (!isAcustic && !isElectro)}
        />
        <label htmlFor='7-strings'>7</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          onChange={changeStringsCountHandle}
          className='visually-hidden'
          type='checkbox'
          id='12-strings'
          name='12-strings'
          defaultChecked={isTwelve}
          disabled={isFilterDefault ? false : (!isAcustic)}
        />
        <label htmlFor='12-strings'>12</label>
      </div>
    </fieldset>
  );
}

export default FilterStrings;
