/* eslint-disable no-console */
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFilters, setIsFilterDefault } from '../../store/actions';
import { getCurrentFilters, getMaxPrice, getMinPrice } from '../../store/selectors';

function FilterPrice(): JSX.Element {
  const filters = useSelector(getCurrentFilters);
  const minPrice = useSelector(getMinPrice); //global
  const maxPrice = useSelector(getMaxPrice); //global
  const dispatch = useDispatch();
  const [priceMin, setPriceMin] = useState(String(minPrice));
  const [priceMax, setPriceMax] = useState(String(maxPrice));

  const priceMinChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMin(evt.target.value);
    if (+evt.target.value >= 0) {
      dispatch(setIsFilterDefault(false));
      dispatch(setCurrentFilters({ ...filters, priceMin: evt.target.value, }));
    }
  };

  const priceMaxChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMax(evt.target.value);
    if (+evt.target.value >= 0 && +evt.target.value > +priceMin) {
      dispatch(setIsFilterDefault(false));
      dispatch(setCurrentFilters({ ...filters, priceMax: evt.target.value, }));
    }
  };


  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='form-input'>
          <label className='visually-hidden'>Минимальная цена</label>
          <input onChange={priceMinChangeHandle} onBlur={() => setPriceMin(String(minPrice))} type='number' placeholder={String(minPrice)} id='priceMin' name='от' value={priceMin} />
        </div>
        <div className='form-input'>
          <label className='visually-hidden'>Максимальная цена</label>
          <input onChange={priceMaxChangeHandle} onBlur={() => setPriceMax(String(maxPrice))} type='number' placeholder={String(maxPrice)} id='priceMax' name='до' value={priceMax} />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
