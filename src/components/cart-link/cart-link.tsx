import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchedGuitars } from '../../store/actions';
import { AppRoute, FAST_DELAY } from '../../utils/const';

function CartLink(): JSX.Element {
  const mockGoodsCount = 2;
  const dispatch = useDispatch();

  return (
    <Link
      data-testid='cart-link'
      className='header__cart-link'
      to={AppRoute.Cart}
      aria-label='Корзина'
      onFocus={() => {
        setTimeout(() => {
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
      <span className='header__cart-count'>{mockGoodsCount}</span>
    </Link>
  );
}

export default CartLink;
