import { KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalToCartOpen, setIsModalToCartSuccessOpen, setSearchedGuitars, setSearchQuery } from '../../store/actions';
import { getCartGuitars, getCartProduct, getIsModalToCartOpen, getIsModalToCartSuccessOpen } from '../../store/selectors';
import { AppRoute, BAD_QUERY } from '../../utils/const';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CartFooter from '../cart-footer/cart-footer';
import CartLink from '../cart-link/cart-link';
import CartList from '../cart-list/cart-list';
import FooterNavItem from '../footer-nav-item/footer-nav-item';
import FormSearch from '../form-search/form-search';
import Logo from '../logo/logo';
import ModalCartSuccess from '../modal-cart-success/modal-cart-success';
import ModalToCart from '../modal-to-cart/modal-to-cart';
import Navigation from '../navigation/navigation';
import Spinner from '../spinner/spinner';

function Cart(): JSX.Element {
  const dispatch = useDispatch();
  const isModalToCartOpen = useSelector(getIsModalToCartOpen);
  const cartProduct = useSelector(getCartProduct);
  const isModalToCartSuccessOpen = useSelector(getIsModalToCartSuccessOpen);
  const cartGuitars = useSelector(getCartGuitars);

  useEffect(() => {
    dispatch(setSearchedGuitars([]));
    dispatch(setSearchQuery(`name_like=${BAD_QUERY}`));
  }, []);

  useEffect(() => {
    if (isModalToCartOpen && isModalToCartSuccessOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isModalToCartOpen, isModalToCartSuccessOpen]);

  const modalCloseHandle = () => {
    if (isModalToCartOpen) {
      dispatch(setIsModalToCartOpen(false));
    }
    if (isModalToCartSuccessOpen) {
      dispatch(setIsModalToCartSuccessOpen(false));
    }
  };

  const keydownEscapeHandle = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Escape') {
      modalCloseHandle();
    }
  };

  return (
    <div onKeyDown={keydownEscapeHandle} className='wrapper'>
      <header className='header' id='header'>
        <div className='container header__wrapper'>
          <Logo />
          <Navigation />
          <FormSearch />
          <CartLink productsCount={cartGuitars.length} />
        </div>
      </header>
      <main className='page-content'>
        <div className='container'>
          <h1 className='title title--bigger page-content__title'>Корзина</h1>
          <Breadcrumbs pathsTree={[AppRoute.Main, AppRoute.Catalog, AppRoute.Cart]} />
          <CartList products={cartGuitars} />
          <CartFooter />
        </div>
      </main>
      <footer className='footer'>
        <div className='footer__container container'>
          <Logo />
          <div className='socials footer__socials'>
            <ul className='socials__list'>
              <li className='socials-item'>
                <a className='socials__link' href='https://www.facebook.com/' aria-label='facebook'>
                  <svg className='socials__icon' width='24' height='24' aria-hidden='true'>
                    <use xlinkHref='#icon-facebook'></use>
                  </svg>
                </a>
              </li>
              <li className='socials-item'>
                <a className='socials__link' href='https://www.instagram.com/' aria-label='instagram'>
                  <svg className='socials__icon' width='24' height='24' aria-hidden='true'>
                    <use xlinkHref='#icon-instagram'></use>
                  </svg>
                </a>
              </li>
              <li className='socials-item'>
                <a className='socials__link' href='https://www.twitter.com/' aria-label='twitter'>
                  <svg className='socials__icon' width='24' height='24' aria-hidden='true'>
                    <use xlinkHref='#icon-twitter'></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <section className='footer__nav-section footer__nav-section--info'>
            <h2 className='footer__nav-title'>О нас</h2>
            <p className='footer__nav-content footer__nav-content--font-secondary'>Магазин гитар, музыкальных инструментов и гитарная мастерская <br /> в Санкт-Петербурге.<br /><br />Все инструменты проверены, отстроены <br /> и доведены до идеала!</p>
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
            <p className='footer__nav-content'>г. Санкт-Петербург,<br /> м. Невский проспект, <br />ул. Казанская 6.</p>
            <div className='footer__nav-content'>
              <svg className='footer__icon' width='8' height='8' aria-hidden='true'>
                <use xlinkHref='#icon-phone'></use>
              </svg><a className='link' href='tel:88125005050'> 8-812-500-50-50</a>
            </div>
            <p className='footer__nav-content'>Режим работы:<br />
              <span className='footer__span'>
                <svg className='footer__icon' width='13' height='13' aria-hidden='true'>
                  <use xlinkHref='#icon-clock'></use>
                </svg><span> с 11:00 до 20:00</span><span>без выходных</span>
              </span>
            </p>
          </section>
        </div>
      </footer>
      {isModalToCartOpen && cartProduct && <ModalToCart product={cartProduct} container={AppRoute.Cart} />}
      {isModalToCartSuccessOpen && cartProduct && <ModalCartSuccess product={cartProduct} container={AppRoute.Cart} />}
      <Spinner />
    </div>
  );
}

export default Cart;
