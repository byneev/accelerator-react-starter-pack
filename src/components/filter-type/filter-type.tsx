/* eslint-disable no-console */
import { ChangeEvent } from 'react';
import { GuitarsTypeProps } from '../../types/filter-type';

export type FilterTypeProps = {
  guitarType: GuitarsTypeProps;
  onChangeGuitarType: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function FilterType({ onChangeGuitarType, guitarType, }: FilterTypeProps): JSX.Element {
  const { isAcustic, isElectro, isUkulele, } = guitarType;

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Тип гитар</legend>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          className='visually-hidden'
          type='checkbox'
          id='acoustic'
          name='acoustic'
          checked={isAcustic}
          onChange={onChangeGuitarType}
        />
        <label htmlFor='acoustic'>Акустические гитары</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          className='visually-hidden'
          type='checkbox'
          id='electric'
          name='electric'
          checked={isElectro}
          onChange={onChangeGuitarType}
        />
        <label htmlFor='electric'>Электрогитары</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          className='visually-hidden'
          type='checkbox'
          id='ukulele'
          name='ukulele'
          checked={isUkulele}
          onChange={onChangeGuitarType}
        />
        <label htmlFor='ukulele'>Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterType;
