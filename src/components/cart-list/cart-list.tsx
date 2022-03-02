import { ProductProps } from '../../types/product-type';
import CartItem from '../cart-item/cart-item';

export type CartListProps = {
  products: ProductProps[];
}

function CartList({ products, }: CartListProps): JSX.Element {


  return (
    <div className='cart'>
      {products.map((product: ProductProps) => <CartItem key={product.id} product={product} />)}
    </div>
  );
}

export default CartList;
