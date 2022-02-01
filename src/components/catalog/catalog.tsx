
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { setCurrentFilters, setCurrentPage, setCurrentQuery, setCurrentSort, setStartRange } from '../../store/actions';
import { initialStateUser } from '../../store/reducers/user-reducer';
import { getCurrentFilters } from '../../store/selectors';
import { AppRoute, PRODUCTS_LIMIT_ON_PAGE, SortType } from '../../utils/const';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CartLink from '../cart-link/cart-link';
import FooterNavItem from '../footer-nav-item/footer-nav-item';
import FormFilter from '../form-filter/form-filter';
import FormSearch from '../form-search/form-search';
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';
import Pagination from '../pagination/pagination';
import ProductsList from '../products-list/products-list';
import Sort from '../sort/sort';
import Spinner from '../spinner/spinner';

function Catalog(): JSX.Element {
  const dispatch = useDispatch();
  const filters = useSelector(getCurrentFilters);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const { page, } = useParams<{ page?: string }>();
  const currentPage = page ? page : '1';
  const startRange = (+currentPage - 1) * PRODUCTS_LIMIT_ON_PAGE;
  const isOuterChange = filters === initialStateUser.currentFilters &&
    (urlSearch.get('type') || urlSearch.get('stringCount') || urlSearch.get('sort') || urlSearch.get('order'));

  useEffect(() => {
    if (isOuterChange) {
      const priceMin = urlSearch.get('price_gte');
      const priceMax = urlSearch.get('price_lte');
      dispatch(setCurrentFilters({
        guitarType: {
          isAcustic: urlSearch.getAll('type').includes('acoustic'),
          isElectro: urlSearch.getAll('type').includes('electric'),
          isUkulele: urlSearch.getAll('type').includes('ukulele'),
        },
        stringsCount: {
          isFour: urlSearch.getAll('stringCount').includes('4'),
          isSix: urlSearch.getAll('stringCount').includes('6'),
          isSeven: urlSearch.getAll('stringCount').includes('7'),
          isTwelve: urlSearch.getAll('stringCount').includes('12'),
        },
        priceMin: priceMin !== null ? priceMin : '',
        priceMax: priceMax !== null ? priceMax : '',
      }));
      if (urlSearch.get('sort') && urlSearch.get('order')) {
        dispatch(setCurrentSort(
          [
            urlSearch.get('sort') === 'price' ? SortType.Price : SortType.Popular,
            urlSearch.get('order') === 'asc' ? SortType.Ascending : SortType.Descending
          ]
        ));
      }
    }
    dispatch(setCurrentQuery(location.search.slice(1)));
    dispatch(setStartRange(startRange));
    dispatch(setCurrentPage(currentPage));
  }, [currentPage, dispatch, isOuterChange, location.search, startRange]);

  return (
    <div className='wrapper'>
      <header className='header' id='header'>
        <div className='container header__wrapper'>
          <Logo />
          <Navigation />
          <FormSearch />
          <CartLink />
        </div>
      </header>
      <main className='page-content'>
        <div className='container'>
          <h1 className='page-content__title title title--bigger'>
            Каталог гитар
          </h1>
          <Breadcrumbs pathsTree={[AppRoute.Main, AppRoute.Catalog]} />
          <div className='catalog'>
            <Sort />
            <FormFilter />
            <ProductsList />
            <Pagination />
          </div>
        </div>
      </main>
      <footer className='footer'>
        <div className='footer__container container'>
          <Logo />
          <div className='socials footer__socials'>
            <ul className='socials__list'>
              <li className='socials-item'>
                <a
                  className='socials__link'
                  href='https://www.facebook.com/'
                  aria-label='facebook'
                >
                  <svg
                    className='socials__icon'
                    width='24'
                    height='24'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-facebook'></use>
                  </svg>
                </a>
              </li>
              <li className='socials-item'>
                <a
                  className='socials__link'
                  href='https://www.instagram.com/'
                  aria-label='instagram'
                >
                  <svg
                    className='socials__icon'
                    width='24'
                    height='24'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-instagram'></use>
                  </svg>
                </a>
              </li>
              <li className='socials-item'>
                <a
                  className='socials__link'
                  href='https://www.twitter.com/'
                  aria-label='twitter'
                >
                  <svg
                    className='socials__icon'
                    width='24'
                    height='24'
                    aria-hidden='true'
                  >
                    <use xlinkHref='#icon-twitter'></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <section className='footer__nav-section footer__nav-section--info'>
            <h2 className='footer__nav-title'>О нас</h2>
            <p className='footer__nav-content footer__nav-content--font-secondary'>
              Магазин гитар, музыкальных инструментов и гитарная мастерская{' '}
              <br /> в Санкт-Петербурге.
              <br />
              <br />
              Все инструменты проверены, отстроены <br /> и доведены до идеала!
            </p>
          </section>
          <section className='footer__nav-section footer__nav-section--links'>
            <h2 className='footer__nav-title'>Информация</h2>
            <ul className='footer__nav-list'>
              <FooterNavItem>Где купить?</FooterNavItem>
              <FooterNavItem>Блог</FooterNavItem>
              <FooterNavItem>Вопрос-ответ</FooterNavItem>
              <FooterNavItem>Возврат</FooterNavItem>
              <FooterNavItem>Сервис-центры</FooterNavItem>
            </ul>
          </section>
          <section className='footer__nav-section footer__nav-section--contacts'>
            <h2 className='footer__nav-title'>Контакты</h2>
            <p className='footer__nav-content'>
              г. Санкт-Петербург,
              <br /> м. Невский проспект, <br />
              ул. Казанская 6.
            </p>
            <div className='footer__nav-content'>
              <svg
                className='footer__icon'
                width='8'
                height='8'
                aria-hidden='true'
              >
                <use xlinkHref='#icon-phone'></use>
              </svg>
              <a className='link' href='tel:88125005050'>
                {' '}
                8-812-500-50-50
              </a>
            </div>
            <p className='footer__nav-content'>
              Режим работы:
              <br />
              <span className='footer__span'>
                <svg
                  className='footer__icon'
                  width='13'
                  height='13'
                  aria-hidden='true'
                >
                  <use xlinkHref='#icon-clock'></use>
                </svg>
                <span> с 11:00 до 20:00</span>
                <span>без выходных</span>
              </span>
            </p>
          </section>
        </div>
      </footer>
      <Spinner />
    </div>
  );
}

export default Catalog;
