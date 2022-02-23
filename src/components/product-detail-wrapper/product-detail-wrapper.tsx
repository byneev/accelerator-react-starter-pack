import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductDetail from '../poduct-detail/product-detail';
import Spinner from '../spinner/spinner';
import { getProductById } from '../../store/api-actions';
import { getCurrentProduct } from '../../store/selectors';
import { setShouldShowSpinner } from '../../store/actions';

function ProductDetailWrapper(): JSX.Element {
  const dispatch = useDispatch();
  const product = useSelector(getCurrentProduct);
  const { id, } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getProductById(+id));
    dispatch(setShouldShowSpinner(true));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      dispatch(setShouldShowSpinner(false));
    }
  }, [dispatch, product]);

  if (!product) {
    return (
      <Spinner />
    );
  }
  return <ProductDetail product={product} />;
}

export default ProductDetailWrapper;
