import { Link } from 'react-router-dom';

export type NavigationItemProps = {
  route: string;
  children: string;
};

function NavigationItem({ children, route, }: NavigationItemProps): JSX.Element {
  return (
    <li>
      <Link className='link main-nav__link link--current' to={route}>
        {children}
      </Link>
    </li>
  );
}

export default NavigationItem;
