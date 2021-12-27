import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

export type FooterNavItemProps = {
  children: string,
}

function FooterNavItem({children} : FooterNavItemProps) : JSX.Element {
  return (
    <li className='footer__nav-list-item'>
      <Link className='link' to={AppRoute.Main}>
        {children}
      </Link>
    </li>
  );
}

export default FooterNavItem;
