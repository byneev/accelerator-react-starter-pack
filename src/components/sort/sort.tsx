import OrderButton from '../order-button/order-button';
import SortButton from '../sort-button/sort-button';

function Sort() : JSX.Element {
  return (
    <div className='catalog-sort'>
      <h2 className='catalog-sort__title'>Сортировать:</h2>
      <div className='catalog-sort__type'>
        <SortButton isActive>
          по цене
        </SortButton>
        <SortButton isActive={false}>
          по популярности
        </SortButton>
      </div>
      <div className='catalog-sort__order'>
        <OrderButton isUp isActive={false} />
        <OrderButton isUp={false} isActive />
      </div>
    </div>
  );
}

export default Sort;
