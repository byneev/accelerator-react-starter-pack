/* eslint-disable no-console */
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { getMaxPrice, getMinPrice } from '../../store/selectors';
import { DefaultFunctionProps } from '../../types/default-function-type';

export type FilterPriceProps = {
  onChangePriceMin: (evt: ChangeEvent<HTMLInputElement>) => void;
  onChangePriceMax: (evt: ChangeEvent<HTMLInputElement>) => void;
  onBlurPriceMin: DefaultFunctionProps;
  onBlurPriceMax: DefaultFunctionProps;
  priceMin: string;
  priceMax: string;
}

function FilterPrice({ onChangePriceMin, onChangePriceMax, onBlurPriceMin, onBlurPriceMax, priceMin, priceMax, }: FilterPriceProps): JSX.Element {
  const priceMinGlobal = useSelector(getMinPrice);
  const priceMaxGlobal = useSelector(getMaxPrice);

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='form-input'>
          <label className='visually-hidden'>Минимальная цена</label>
          <input onChange={onChangePriceMin} onBlur={onBlurPriceMin} type='number' placeholder={priceMinGlobal} id='priceMin' name='от' value={priceMin} />
        </div>
        <div className='form-input'>
          <label className='visually-hidden'>Максимальная цена</label>
          <input onChange={onChangePriceMax} onBlur={onBlurPriceMax} type='number' placeholder={priceMaxGlobal} id='priceMax' name='до' value={priceMax} />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
