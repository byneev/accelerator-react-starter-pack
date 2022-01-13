/* eslint-disable no-console */
import { ChangeEvent } from 'react';
import { GuitarsTypeProps } from '../../types/filter-type';

export type FilterTypeProps = {
  guitarType: GuitarsTypeProps;
  onChangeGuitarType: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function FilterType({ onChangeGuitarType, guitarType, }: FilterTypeProps): JSX.Element {
  // const filters = useSelector(getCurrentFilters);
  // const minPrice = useSelector(getMinPrice);
  // const maxPrice = useSelector(getMaxPrice);
  // const dispatch = useDispatch();
  // const [isAcustic, setIsAcustic] = useState(false);
  // const [isElectro, setIsElectro] = useState(false);
  // const [isUkulele, setIsUkulele] = useState(false);
  // each filter rerender with all filter change
  // const typeChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
  //   const name = evt.target.name;
  //   dispatch(setIsFilterDefault(false));
  //   switch (name) {
  //     case 'acoustic':
  //       setIsAcustic((prevIsAcustic) => !prevIsAcustic);
  //       dispatch(setCurrentFilters({ ...filters, priceMin: minPrice, priceMax: maxPrice, guitarType: { ...filters.guitarType, isAcustic: !isAcustic, }, }));
  //       break;
  //     case 'electric':
  //       setIsElectro(!isElectro);
  //       (setCurrentFilters({ ...filters, priceMin: minPrice, priceMax: maxPrice, guitarType: { ...filters.guitarType, isElectro: !isElectro, }, }));
  //       break;
  //     case 'ukulele':
  //       setIsUkulele(!isUkulele);
  //       dispatch(setCurrentFilters({ ...filters, priceMin: minPrice, priceMax: maxPrice, guitarType: { ...filters.guitarType, isUkulele: !isUkulele, }, }));
  //       break;
  //   }
  // };
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
          defaultChecked={isAcustic}
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
          defaultChecked={isElectro}
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
          defaultChecked={isUkulele}
          onChange={onChangeGuitarType}
        />
        <label htmlFor='ukulele'>Укулеле</label>
      </div>
    </fieldset>
  );
}

export default FilterType;
