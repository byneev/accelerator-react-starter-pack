import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import ModalSuccessReview from './modal-success-review';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({ [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(), });

describe('Testing ModalSuccessReview component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalSuccessReview />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
  });
});
