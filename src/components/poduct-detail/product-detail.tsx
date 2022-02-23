/* eslint-disable no-console */
import { KeyboardEvent, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalReviewOpen, setIsModalReviewSuccessOpen, setSearchedGuitars, setSearchQuery } from '../../store/actions';
import { getIsModalReviewOpen, getIsModalReviewSuccessOpen, getReviews } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { AppRoute, BAD_QUERY } from '../../utils/const';
import { getCorrectImgURL } from '../../utils/helpers';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import CartLink from '../cart-link/cart-link';
import FooterNavItem from '../footer-nav-item/footer-nav-item';
import FormSearch from '../form-search/form-search';
import Logo from '../logo/logo';
import ModalReview from '../modal-review/modal-review';
import ModalSuccessReview from '../modal-success-review/modal-success-review';
import Navigation from '../navigation/navigation';
import ProductPrice from '../product-price/product-price';
import ProductRate from '../product-rate/product-rate';
import ProductReviewsList from '../product-reviews-list/product-reviews-list';
import Spinner from '../spinner/spinner';
import Tabs from '../tabs/tabs';

export type ProductDetailProps = {
  product: ProductProps,
}

function ProductDetail({ product, }: ProductDetailProps): JSX.Element {
  const dispatch = useDispatch();
  const previewImg = getCorrectImgURL(product);
  const reviews = useSelector(getReviews);
  const isModalReviewOpen = useSelector(getIsModalReviewOpen);
  const isModalReviewSuccessOpen = useSelector(getIsModalReviewSuccessOpen);

  useEffect(() => {
    dispatch(setSearchedGuitars([]));
    dispatch(setSearchQuery(`name_like=${BAD_QUERY}`));
  }, []);

  const keyDownEscHandle = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Escape') {
      if (isModalReviewOpen) {
        dispatch(setIsModalReviewOpen(false));
      }
      if (isModalReviewSuccessOpen) {
        dispatch(setIsModalReviewSuccessOpen(false));
      }
    }
  };

  const detailPageClickHandle = (evt: MouseEvent<HTMLDivElement>) => {
    if (isModalReviewOpen) {
      dispatch(setIsModalReviewOpen(false));
    }
    if (isModalReviewSuccessOpen) {
      dispatch(setIsModalReviewSuccessOpen(false));
    }
  };

  return (
    <div onKeyDown={keyDownEscHandle} className='wrapper' tabIndex={0}>
      <header className='header' id='header'>
        <div className='container header__wrapper'>
          <Logo />
          <Navigation />
          <FormSearch />
          <CartLink />
        </div>
      </header>
      <main className='page-content'>
        <div onClick={detailPageClickHandle} className='container' tabIndex={1}>
          <h1 className='page-content__title title title--bigger'>
            {product.name}
          </h1>
          <Breadcrumbs pathsTree={[AppRoute.Main, AppRoute.Catalog, product.name]} />

          <div className='product-container'><img className='product-container__img' src={previewImg} width='90' height='235' alt='' />
            <div className='product-container__info-wrapper'>
              <h2 className='product-container__title title title--big title--uppercase'>{product.name}</h2>
              <ProductRate rating={product.rating} ratingsCount={String(reviews.length)} route={AppRoute.Guitars} />
              <Tabs product={product} />
            </div>
            <ProductPrice product={product} />
          </div>
          <ProductReviewsList id={product.id} />
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
      {isModalReviewSuccessOpen && <ModalSuccessReview />}
      {isModalReviewOpen && <ModalReview product={product} reviews={reviews} />}
    </div>
  );
}

export default ProductDetail;
