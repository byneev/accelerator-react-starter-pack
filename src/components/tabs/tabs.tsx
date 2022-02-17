import { useSelector } from 'react-redux';
import { getCurrentTab } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import TabsCharacteristics from '../tabs-characteristics/tabs-characteristics';
import TabsControls from '../tabs-controls/tabs-controls';
import TabsDescription from '../tabs-description/tabs-description';

export type TabsProps = {
  product: ProductProps;
}

function Tabs({ product, }: TabsProps): JSX.Element {
  const currentTab = useSelector(getCurrentTab);

  return (
    <div className='tabs'>
      <TabsControls currentTab={currentTab} />
      <div className='tabs__content' id='characteristics'>
        <TabsCharacteristics product={product} currentTab={currentTab} />
        <TabsDescription product={product} currentTab={currentTab} />
      </div>
    </div>
  );
}

export default Tabs;
