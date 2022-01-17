import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { getPriceRangeAll } from '../../store/selectors';
import { DefaultFunctionProps } from '../../types/default-function-type';
import { PriceRangeProps } from '../../types/price-range-type';

export type FilterPriceProps = {
  onChangePriceMin: (evt: ChangeEvent<HTMLInputElement>) => void;
  onChangePriceMax: (evt: ChangeEvent<HTMLInputElement>) => void;
  onBlurPriceMin: DefaultFunctionProps;
  onBlurPriceMax: DefaultFunctionProps;
  priceMin: string;
  priceMax: string;
  actualPriceRange: PriceRangeProps;
}

function FilterPrice({ onChangePriceMin, onChangePriceMax, onBlurPriceMin, onBlurPriceMax, priceMin, priceMax, actualPriceRange, }: FilterPriceProps): JSX.Element {
  const priceRangeAll = useSelector(getPriceRangeAll);

  return (
    <fieldset className='catalog-filter__block'>
      <legend className='catalog-filter__block-title'>Цена, ₽</legend>
      <div className='catalog-filter__price-range'>
        <div className='form-input'>
          <label className='visually-hidden'>Минимальная цена</label>
          <input onChange={onChangePriceMin} onBlur={onBlurPriceMin} type='number' placeholder={actualPriceRange.min === '' ? priceRangeAll.min : actualPriceRange.min} id='priceMin' name='от' value={priceMin} />
        </div>
        <div className='form-input'>
          <label className='visually-hidden'>Максимальная цена</label>
          <input onChange={onChangePriceMax} onBlur={onBlurPriceMax} type='number' placeholder={actualPriceRange.max === '' ? priceRangeAll.max : actualPriceRange.max} id='priceMax' name='до' value={priceMax} />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
