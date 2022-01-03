/* eslint-disable no-console */
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentFilters } from '../../store/actions';
import { getCurrentFilters, getMaxPrice, getMinPrice } from '../../store/selectors';

function FilterPrice(): JSX.Element {
  const filters = useSelector(getCurrentFilters);
  // minPrice and maxPrice set in upper level according real guitars array
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);
  const dispatch = useDispatch();
  const [priceMin, setPriceMin] = useState(String(minPrice));
  const [priceMax, setPriceMax] = useState(String(maxPrice));

  const priceMinChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMin(evt.target.value);
    setTimeout(() => {
      if (+evt.target.value < 0 || +evt.target.value < minPrice) {
        setPriceMin(String(minPrice));
      } else {
        dispatch(setCurrentFilters({ ...filters, priceMin: evt.target.value, }));
      }
    }, 2000);
  };

  const priceMaxChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    setPriceMax(evt.target.value);
    setTimeout(() => {
      if (+evt.target.value < 0 || +evt.target.value > maxPrice) {
        setPriceMax(String(maxPrice));
      } else {
        dispatch(setCurrentFilters({ ...filters, priceMax: evt.target.value, }));
      }
    }, 2000);
  };


  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='form-input'>
          <label className='visually-hidden'>Минимальная цена</label>
          <input onChange={priceMinChangeHandle} type='number' placeholder={String(minPrice)} id='priceMin' name='от' value={priceMin} />
        </div>
        <div className='form-input'>
          <label className='visually-hidden'>Максимальная цена</label>
          <input onChange={priceMaxChangeHandle} type='number' placeholder={String(maxPrice)} id='priceMax' name='до' value={priceMax} />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
