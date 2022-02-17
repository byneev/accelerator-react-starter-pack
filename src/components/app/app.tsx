import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductDetailGetWrapper from '../../hocs/product-detail-get-wrapper';
import { AppRoute } from '../../utils/const';
import Catalog from '../catalog/catalog';
import Main from '../main/main';
import NotFound from '../not-found/not-found';
import ProductDetail from '../poduct-detail/product-detail';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main />
        </Route >
        <Route path={`${AppRoute.Catalog}/:page`} exact>
          <Catalog />
        </Route>
        <Route path={`${AppRoute.Guitars}/:id`} exact>
          <ProductDetailGetWrapper />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
