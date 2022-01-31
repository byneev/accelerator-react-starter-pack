
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
    <div className='spinner-wrapper'>
      <div id='loading'></div>
    </div>
  );
}

export default Spinner;
