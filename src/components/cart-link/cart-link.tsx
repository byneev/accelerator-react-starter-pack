import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchedGuitars, setSearchInput } from '../../store/actions';
import { AppRoute, FAST_DELAY } from '../../utils/const';

export type CartLinkProps = {
  productsCount: number;
}

function CartLink({ productsCount, }: CartLinkProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <Link
      data-testid='cart-link'
      className='header__cart-link'
      to={AppRoute.Cart}
      aria-label='Корзина'
      onFocus={() => {
        setTimeout(() => {
          dispatch(setSearchInput(''));
          dispatch(setSearchedGuitars([]));
        }, FAST_DELAY);
      }}
    >
      <svg
        className='header__cart-icon'
        width='14'
        height='14'
        aria-hidden='true'
      >
        <use xlinkHref='#icon-basket'></use>
      </svg>
      <span className='visually-hidden'>Перейти в корзину</span>
      {productsCount !== 0 ?
        <span className='header__cart-count'>{productsCount}</span> :
        ''}
    </Link>
  );
}

export default CartLink;
