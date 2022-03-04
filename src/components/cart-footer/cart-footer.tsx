/* eslint-disable no-console */
import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCartGuitars, getCurrentCoupon } from '../../store/selectors';
import { ProductProps } from '../../types/product-type';
import { CouponType, LOCALE } from '../../utils/const';
import { getSumAfterSale } from '../../utils/helpers';

function CartFooter(): JSX.Element {
  const cartGuitars = useSelector(getCartGuitars);
  const currentCoupon = useSelector(getCurrentCoupon);
  const [promocode, setPromocode] = useState('');
  const sum = cartGuitars.map((item: [ProductProps, number]) => item[0].price * item[1]).reduce((prev, next) => prev + next, 0);
  const finalSum = getSumAfterSale(sum, currentCoupon);

  const promocodeInputChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    setPromocode(evt.target.value);
  };

  return (
    <div className='cart__footer'>
      <div className='cart__coupon coupon'>
        <h2 className='title title--little coupon__title'>Промокод на скидку</h2>
        <p className='coupon__info'>Введите свой промокод, если он у вас есть.</p>
        <form className='coupon__form' id='coupon-form' method='post' action='/'>
          <div className='form-input coupon__input'>
            <label className='visually-hidden'>Промокод</label>
            <input onChange={promocodeInputChangeHandle} type='text' placeholder='Введите промокод' id='coupon' name='coupon' value={promocode} />
            <p className='form-input__message form-input__message--success'>Промокод принят</p>
          </div>
          <button className='button button--big coupon__button'>Применить</button>
        </form>
      </div>
      <div className='cart__total-info'>
        <p className='cart__total-item'><span className='cart__total-value-name'>Всего:</span><span className='cart__total-value'>{sum.toLocaleString(LOCALE)} ₽</span></p>
        <p className='cart__total-item'><span className='cart__total-value-name'>Скидка:</span><span className={currentCoupon !== CouponType.None ? 'cart__total-value cart__total-value--bonus' : 'cart__total-value'}>- {sum - finalSum} ₽</span></p>
        <p className='cart__total-item'><span className='cart__total-value-name'>К оплате:</span><span className='cart__total-value cart__total-value--payment'>{getSumAfterSale(sum, currentCoupon).toLocaleString(LOCALE)} ₽</span></p>
        <button className='button button--red button--big cart__order-button'>Оформить заказ</button>
      </div>
    </div>
  );
}

export default CartFooter;
