import SearchSelect from '../search-select/search-select';

function FormSearch(): JSX.Element {
  const mockResultsFromServer: string[] = [
    'Четстер UX5',
    'Четстер UX',
    'Четстер Plus',
    'Четстер UX2',
    'Четстер UX3',
  ];

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
        <input
          className='form-search__input'
          id='search'
          type='text'
          autoComplete='off'
          placeholder='что вы ищите?'
        />
        <label className='visually-hidden' htmlFor='search'>
          Поиск
        </label>
      </form>
      <SearchSelect searchResults={mockResultsFromServer} />
    </div>
  );
}

export default FormSearch;
