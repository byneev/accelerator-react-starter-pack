/* eslint-disable no-console */
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFilters, setIsFilterDefault } from '../../store/actions';
import { getCurrentFilters } from '../../store/selectors';

function FilterType(): JSX.Element {
  const filters = useSelector(getCurrentFilters);
  const dispatch = useDispatch();
  const [isAcustic, setIsAcustic] = useState(false);
  const [isElectro, setIsElectro] = useState(false);
  const [isUkulele, setIsUkulele] = useState(false);
  // each filter rerender with all filter change
  const typeChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(filters);
    const guitarType = filters.guitarType;
    const name = evt.target.name;
    dispatch(setIsFilterDefault(false));
    switch (name) {
      case 'acoustic':
        setIsAcustic((prevIsAcustic) => !prevIsAcustic);
        dispatch(setCurrentFilters({ ...filters, guitarType: { ...guitarType, isAcustic: !isAcustic, }, }));
        break;
      case 'electric':
        setIsElectro(!isElectro);
        dispatch(setCurrentFilters({ ...filters, guitarType: { ...guitarType, isElectro: !isElectro, }, }));
        break;
      case 'ukulele':
        setIsUkulele(!isUkulele);
        dispatch(setCurrentFilters({ ...filters, guitarType: { ...guitarType, isUkulele: !isUkulele, }, }));
        break;
    }
  };

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Тип гитар</legend>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          className='visually-hidden'
          type='checkbox'
          id='acoustic'
          name='acoustic'
          defaultChecked={isAcustic}
          onChange={typeChangeHandle}
        />
        <label htmlFor='acoustic'>Акустические гитары</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          className='visually-hidden'
          type='checkbox'
          id='electric'
          name='electric'
          defaultChecked={isElectro}
          onChange={typeChangeHandle}
        />
        <label htmlFor='electric'>Электрогитары</label>
      </div>
      <div className='form-checkbox catalog-filter__block-item'>
        <input
          className='visually-hidden'
          type='checkbox'
          id='ukulele'
          name='ukulele'
          defaultChecked={isUkulele}
          onChange={typeChangeHandle}
        />
        <label htmlFor='ukulele'>Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterType;
