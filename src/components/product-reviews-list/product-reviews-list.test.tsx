import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { NameSpace } from '../../store/reducers/root-reducer';
import { getAppStateMock, getMockReview, getUserStateMock } from '../../utils/mock';
import ProductReviewsList from './product-reviews-list';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.User]: getUserStateMock(), [NameSpace.App]:
  {
    ...getAppStateMock(),
    reviews: [getMockReview(), { ...getMockReview(), id: '2', }, { ...getMockReview(), id: '3', }, { ...getMockReview(), id: '4', }],
  },
});

describe('Testing ProductReviewsList component', () => {
  it('Should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductReviewsList id={0} />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getAllByText('Oleg')).toHaveLength(3);
    expect(screen.getByText('Показать еще отзывы')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('show-more'));
    expect(screen.getAllByText('Oleg')).toHaveLength(4);
    expect(screen.queryByText('Показать еще отзывы')).not.toBeInTheDocument();
  });
});
