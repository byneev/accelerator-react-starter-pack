import { ProductProps } from '../../types/product-type';
import ProductCard from '../product-card/product-card';

export type ProductsListProps = {
  products: ProductProps[],
}

function ProductsList({products} : ProductsListProps) : JSX.Element {
  let id = products[0].id;

  return (
    <div className='cards catalog__cards'>
      {products.map((item : ProductProps) => <ProductCard key={id++} product={item}/>)}
    </div>
  );
}

export default ProductsList;
