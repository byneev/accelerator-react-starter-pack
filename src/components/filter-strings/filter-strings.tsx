import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { getIsFilterDefault } from '../../store/selectors';
import { GuitarsTypeProps, StringsCountProps } from '../../types/filter-type';

export type FilterStringsProps = {
  guitarType: GuitarsTypeProps;
  stringsCount: StringsCountProps;
  onChangeStringCount: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function FilterStrings({ guitarType, stringsCount, onChangeStringCount, }: FilterStringsProps): JSX.Element {
  const isFilterDefault = useSelector(getIsFilterDefault);
  const { isAcustic, isElectro, isUkulele, } = guitarType;
  const { isFour, isSix, isSeven, isTwelve, } = stringsCount;

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Количество струн</legend>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          onChange={onChangeStringCount}
          className='visually-hidden'
          type='checkbox'
          id='4-strings'
          name='4-strings'
          checked={isFour}
          disabled={isFilterDefault ? false : (!isUkulele && !isElectro)}
        />
        <label htmlFor='4-strings'>4</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          onChange={onChangeStringCount}
          className='visually-hidden'
          type='checkbox'
          id='6-strings'
          name='6-strings'
          checked={isSix}
          disabled={isFilterDefault ? false : (!isAcustic && !isElectro)}
        />
        <label htmlFor='6-strings'>6</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          onChange={onChangeStringCount}
          className='visually-hidden'
          type='checkbox'
          id='7-strings'
          name='7-strings'
          checked={isSeven}
          disabled={isFilterDefault ? false : (!isAcustic && !isElectro)}
        />
        <label htmlFor='7-strings'>7</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          onChange={onChangeStringCount}
          className='visually-hidden'
          type='checkbox'
          id='12-strings'
          name='12-strings'
          checked={isTwelve}
          disabled={isFilterDefault ? false : (!isAcustic)}
        />
        <label htmlFor='12-strings'>12</label>
      </div>
    </fieldset>
  );
}

export default FilterStrings;
