import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getMockProduct, getMockReview, getUserStateMock } from '../../utils/mock';
import ModalReview from './modal-review';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({ [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(), });

describe('Testing ModalReview component', () => {
  const reviews = [getMockReview(), getMockReview()];
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ModalReview product={getMockProduct()} reviews={reviews} />
        </Router>
      </Provider>
    );
    expect(screen.getByText(/Ваше имя/i)).toBeInTheDocument();
    fireEvent.submit(screen.getByTestId('form'));
    expect(screen.getByText(/Заполните поле/i)).toBeInTheDocument();
    expect(screen.getByText(/Поставьте оценку/i)).toBeInTheDocument();
    const nameField = screen.getByRole('textbox', { name: 'Ваше Имя', });
    userEvent.type(nameField, 'Oleg');
    const radioFields = screen.getAllByRole('radio');
    userEvent.click(radioFields[0]);
    fireEvent.submit(screen.getByTestId('form'));
    expect(screen.queryByText(/Заполните поле/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Поставьте оценку/i)).not.toBeInTheDocument();
  });
});
