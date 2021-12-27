import { AppRoute } from '../../utils/const';
import NavigationItem from '../navigation-item/navigation-item';

function Navigation(): JSX.Element {
  return (
    <nav className='main-nav'>
      <ul className='main-nav__list'>
        <NavigationItem route={AppRoute.Main}>Каталог</NavigationItem>
        <NavigationItem route={AppRoute.Main}>Где купить?</NavigationItem>
        <NavigationItem route={AppRoute.Main}>О компании</NavigationItem>
      </ul>
    </nav>
  );
}

export default Navigation;
