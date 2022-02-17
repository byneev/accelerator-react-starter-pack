import { ProductProps } from '../../types/product-type';
import { CurrentTab } from '../../utils/const';

export type TabsDescriptionProps = {
  currentTab: CurrentTab,
  product: ProductProps,
}

function TabsDescription({ currentTab, product, }: TabsDescriptionProps): JSX.Element {
  const classNames = ['tabs__product-description'];
  if (currentTab === CurrentTab.Characteristics) {
    classNames.push('hidden');
  }

  return (
    <p className={classNames.join(' ')}>{product.description}</p>
  );
}

export default TabsDescription;
