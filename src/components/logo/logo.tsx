import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

function Logo(): JSX.Element {
  return (
    <Link to={AppRoute.Main} className='header__logo logo'>
      <img
        className='logo__img'
        width='70'
        height='70'
        src='/img/svg/logo.svg'
        alt='Логотип'
      />
    </Link>
  );
}

export default Logo;
