/* eslint-disable no-console */
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSale } from '../../store/actions';
import { setCouponToServer } from '../../store/api-actions';
import { getCartGuitars, getCurrentSale } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { CouponType, LOCALE } from '../../utils/const';
import ValidateMessage from '../validate-message/validate-message';

function CartFooter(): JSX.Element {
  const dispatch = useDispatch();
  const cartGuitars = useSelector(getCartGuitars);
  const currentSale = useSelector(getCurrentSale);
  const [promocode, setPromocode] = useState('');
  const [validCode, setValidCode] = useState(0);
  const sum = cartGuitars.map((item: [ProductProps, number]) => item[0].price * item[1]).reduce((prev, next) => prev + next, 0);
  const finalSum = sum * (1 - currentSale / 100);
  const sale = Math.abs(finalSum - sum);

  const promocodeInputChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromocode(evt.target.value);
  };

  const promocodeSubmitChangeHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (Object.values(CouponType).includes(promocode as CouponType)) {
      dispatch(setCouponToServer(promocode));
      setValidCode(1);
    } else {
      dispatch(setCurrentSale(0));
      setValidCode(2);
    }
    setPromocode('');
  };

  return (
    <div className='cart__footer'>
      <div className='cart__coupon coupon'>
        <h2 className='title title--little coupon__title'>Промокод на скидку</h2>
        <p className='coupon__info'>Введите свой промокод, если он у вас есть.</p>
        <form onSubmit={promocodeSubmitChangeHandle} className='coupon__form' id='coupon-form' method='post' action='/'>
          <div className='form-input coupon__input'>
            <label className='visually-hidden'>Промокод</label>
            <input onChange={promocodeInputChangeHandle} type='text' placeholder='Введите промокод' id='coupon' name='coupon' value={promocode} />
            <ValidateMessage validateCode={validCode} />
          </div>
          <button className='button button--big coupon__button'>Применить</button>
        </form>
      </div>
      <div className='cart__total-info'>
        <p className='cart__total-item'><span className='cart__total-value-name'>Всего:</span><span className='cart__total-value'>{sum.toLocaleString(LOCALE)} ₽</span></p>
        <p className='cart__total-item'><span className='cart__total-value-name'>Скидка:</span><span className={currentSale !== 0 ? 'cart__total-value cart__total-value--bonus' : 'cart__total-value'}>{currentSale !== 0 ? ' - ' : ''}{sale} ₽</span></p>
        <p className='cart__total-item'><span className='cart__total-value-name'>К оплате:</span><span className='cart__total-value cart__total-value--payment'>{(finalSum).toLocaleString(LOCALE)} ₽</span></p>
        <button className='button button--red button--big cart__order-button'>Оформить заказ</button>
      </div>
    </div>
  );
}

export default CartFooter;
