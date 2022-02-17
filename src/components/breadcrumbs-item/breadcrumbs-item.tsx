import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

export type BreadcrumbsItemProps = {
  route: AppRoute | string;
  isCurrent: boolean;
  children: string | undefined;
};

function BreadcrumbsItem({
  isCurrent,
  children,
  route,
}: BreadcrumbsItemProps): JSX.Element {
  return (
    <li className='breadcrumbs__item'>
      {isCurrent ? (
        <a className='link'>{children}</a>
      ) : (
        <Link className='link' to={route === AppRoute.Catalog ? `${AppRoute.Catalog}/1` : route}>
          {children}
        </Link>
      )}
    </li>
  );
}

export default BreadcrumbsItem;
