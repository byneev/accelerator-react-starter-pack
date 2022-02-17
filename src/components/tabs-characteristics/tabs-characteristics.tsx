import { ProductProps } from '../../types/product-type';
import { CurrentTab, GuitarTypeAliases } from '../../utils/const';

export type TabsCharacteristicsProps = {
  currentTab: CurrentTab;
  product: ProductProps;
}

function TabsCharacteristics({ currentTab, product, }: TabsCharacteristicsProps): JSX.Element {
  const classNames = ['tabs__table'];
  if (currentTab === CurrentTab.Description) {
    classNames.push('hidden');
  }

  return (
    <table className={classNames.join(' ')}>
      <tr className='tabs__table-row'>
        <td className='tabs__title'>Артикул:</td>
        <td className='tabs__value'>{product.vendorCode}</td>
      </tr>
      <tr className='tabs__table-row'>
        <td className='tabs__title'>Тип:</td>
        <td className='tabs__value'>{GuitarTypeAliases.get(product.type)}</td>
      </tr>
      <tr className='tabs__table-row'>
        <td className='tabs__title'>Количество струн:</td>
        <td className='tabs__value'>{product.stringCount} струнная</td>
      </tr>
    </table>
  );
}

export default TabsCharacteristics;
