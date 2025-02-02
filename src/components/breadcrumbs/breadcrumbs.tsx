import { AppRoute, AppRouteAliases } from '../../utils/const';
import BreadcrumbsItem from '../breadcrumbs-item/breadcrumbs-item';

export type BreadcrumbsProps = {
  pathsTree: (AppRoute | string)[];
};

function Breadcrumbs({ pathsTree, }: BreadcrumbsProps): JSX.Element {
  return (
    <ul className='breadcrumbs page-content__breadcrumbs'>
      {pathsTree.map((item: AppRoute | string, index: number) =>
        index === pathsTree.length - 1 ? (
          <BreadcrumbsItem key={item} route={item} isCurrent>
            {AppRouteAliases.get(item) || item}
          </BreadcrumbsItem>
        ) : (
          <BreadcrumbsItem key={item} route={item} isCurrent={false}>
            {AppRouteAliases.get(item)}
          </BreadcrumbsItem>
        )
      )}
    </ul>
  );
}

export default Breadcrumbs;
