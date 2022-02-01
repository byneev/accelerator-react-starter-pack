
import React from 'react';
import { useSelector } from 'react-redux';
import { getShouldShowSpinner } from '../../store/selectors';

function Spinner(): JSX.Element {
  const shouldShowSpinner = useSelector(getShouldShowSpinner);

  if (!shouldShowSpinner) {
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }

  return (
    <div data-testid='spinner' className='spinner-wrapper'>
      <div id='loading'>Загрузка</div>
    </div>
  );
}

export default Spinner;
