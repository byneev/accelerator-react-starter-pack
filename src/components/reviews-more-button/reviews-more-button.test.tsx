import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getUserStateMock } from '../../utils/mock';
import ReviewMoreButton from './reviews-more-button';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(), [NameSpace.App]: getAppStateMock(),
});

describe('Testing ReviewsMoreButton component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewMoreButton onMoreClick={jest.fn()} />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Показать еще отзывы')).toBeInTheDocument();
  });
});
