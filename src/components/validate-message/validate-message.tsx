/* eslint-disable no-console */
export type ValidateMessageProps = {
  validateCode: number;
}

function ValidateMessage({ validateCode, }: ValidateMessageProps): JSX.Element {
  console.log(validateCode);

  if (validateCode === 1) {
    return <p className='form-input__message form-input__message--success'>Промокод принят</p>;
  }
  if (validateCode === 2) {
    return <p className='form-input__message form-input__message--error'>Неверный промокод</p>;
  }
  return <p className='form-input__message form-input__message--error hidden'>Промокод не введён</p>;
}

export default ValidateMessage;
