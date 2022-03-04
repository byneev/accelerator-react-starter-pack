import { ProductProps } from '../../types/product-type';
import CartItem from '../cart-item/cart-item';

export type CartListProps = {
  products: [ProductProps, number][];
}

function CartList({ products, }: CartListProps): JSX.Element {

  return (
    <div className='cart'>
      {products.slice().sort((productA: [ProductProps, number], productB: [ProductProps, number]) => productA[0].price - productB[0].price).map((item: [ProductProps, number]) => <CartItem key={item[0].id} product={item[0]} count={item[1]} />)}
    </div>
  );
}

export default CartList;
