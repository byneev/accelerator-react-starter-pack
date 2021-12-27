import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

export type NavigationItemProps = {
  route: AppRoute;
  children: string;
};

function NavigationItem({ children, route }: NavigationItemProps): JSX.Element {
  return (
    <li>
      <Link className="link main-nav__link link--current" to={route}>
        {children}
      </Link>
    </li>
  );
}

export default NavigationItem;
