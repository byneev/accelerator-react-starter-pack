/* eslint-disable no-console */
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedGuitars, setSearchQuery } from '../../store/actions';
import { getSearchedProducts } from '../../store/api-actions';
import { getSearchQuery } from '../../store/selectors';
import { BAD_QUERY, BASIC_DELAY, FAST_DELAY } from '../../utils/const';
import SearchSelect from '../search-select/search-select';

function FormSearch(): JSX.Element {
  const dispatch = useDispatch();
  const searchQuery = useSelector(getSearchQuery);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      dispatch(getSearchedProducts(searchQuery));
    }
  }, [searchQuery, dispatch]);

  const searchFormChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setInputValue(evt.target.value);
    if (evt.target.value === '') {
      dispatch(setSearchedGuitars([]));
      dispatch(setSearchQuery(`name_like=${BAD_QUERY}`));
    } else {
      dispatch(setSearchQuery(`name_like=${evt.target.value}`));
    }
  };


  return (
    <div className='form-search'>
      <form className='form-search__form'>
        <button className='form-search__submit' type='submit'>
          <svg
            className='form-search__icon'
            width='14'
            height='15'
            aria-hidden='true'
          >
            <use xlinkHref='#icon-search'></use>
          </svg>
          <span className='visually-hidden'>Начать поиск</span>
        </button>
        <input onChange={searchFormChangeHandle}
          onBlur={() => {
            setInputValue('');
            setTimeout(() => {
              dispatch(setSearchedGuitars([]));
            }, FAST_DELAY);
          }}
          className='form-search__input'
          id='search'
          type='text'
          autoComplete='off'
          placeholder='что вы ищите?'
          value={inputValue}
        />
        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>
      </form>
      <SearchSelect />
    </div>
  );
}

export default FormSearch;
