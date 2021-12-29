/* eslint-disable no-console */
import { useSelector } from 'react-redux';
import { getGuitars } from '../../store/selectors';
import { AppRoute } from '../../utils/const';
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

function Main(): JSX.Element {
  const mockBreadcrumbsPath: AppRoute[] = [AppRoute.Main, AppRoute.Catalog];
  const products = useSelector(getGuitars);

  if (products.length === 0) {
    return <div></div>;
  }

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
          <Breadcrumbs pathsTree={mockBreadcrumbsPath} />
          <div className='catalog'>
            <Sort />
            <FormFilter />
            <ProductsList />
            <Pagination productsCount={products.length} />
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
    </div>
  );
}

export default Main;
