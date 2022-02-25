import { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedGuitars, setSearchInput, setSearchQuery } from '../../store/actions';
import { getSearchedProducts } from '../../store/api-actions';
import { getSearchInput, getSearchQuery } from '../../store/selectors';
import { BAD_QUERY, FAST_DELAY } from '../../utils/const';
import SearchSelect from '../search-select/search-select';

function FormSearch(): JSX.Element {
  const dispatch = useDispatch();
  const formContainer = useRef<HTMLDivElement>(null);
  const searchQuery = useSelector(getSearchQuery);
  const searchInput = useSelector(getSearchInput);

  const keydownTabHandle = useCallback((evt: Event) => {
    if (!(evt instanceof KeyboardEvent)) {
      return;
    }
    if (evt.key === 'Tab') {
      if (formContainer.current && !formContainer.current.contains(document.activeElement)) {
        dispatch(setSearchInput(''));
        setTimeout(() => {
          dispatch(setSearchedGuitars([]));
        }, FAST_DELAY);
        document.body.removeEventListener('keydown', keydownTabHandle);
        evt.preventDefault();
      }
    }
  }, [dispatch]);

  const clickHandle = useCallback((evt: MouseEvent) => {
    if (!(evt.target instanceof Node) || evt.target instanceof HTMLLinkElement || evt.target instanceof HTMLAnchorElement || evt.target instanceof HTMLButtonElement || evt.target instanceof HTMLLabelElement || evt.target instanceof HTMLInputElement) {
      return;
    }
    if (formContainer.current && !formContainer.current.contains(evt.target)) {
      dispatch(setSearchInput(''));
      setTimeout(() => {
        dispatch(setSearchedGuitars([]));
      }, FAST_DELAY);
    }
    evt.preventDefault();
  }, [dispatch]);

  useEffect(() => {
    document.body.removeEventListener('keydown', keydownTabHandle);
    document.body.removeEventListener('click', clickHandle);
    return () => {
      document.body.removeEventListener('keydown', keydownTabHandle);
      document.body.removeEventListener('click', clickHandle);
    };
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      dispatch(getSearchedProducts(searchQuery));
    }
  }, [searchQuery, dispatch]);

  useEffect(() => {
    if (searchInput === '') {
      document.body.removeEventListener('keydown', keydownTabHandle);
      document.body.removeEventListener('click', clickHandle);
    }
  }, [clickHandle, keydownTabHandle, searchInput]);

  const searchFormChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(evt.target.value));
    if (evt.target.value === '') {
      dispatch(setSearchedGuitars([]));
      dispatch(setSearchQuery(`name_like=${BAD_QUERY}`));
    } else {
      dispatch(setSearchQuery(`name_like=${evt.target.value}`));
    }
  };

  const setListeners = () => {
    document.body.addEventListener('keydown', keydownTabHandle);
    document.body.addEventListener('click', clickHandle);
  };

  return (
    <div ref={formContainer} className='form-search'>
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
          onFocus={setListeners}
          className='form-search__input'
          id='search'
          type='text'
          autoComplete='off'
          placeholder='что вы ищите?'
          value={searchInput}
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
