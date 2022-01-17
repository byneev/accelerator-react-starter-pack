import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import Catalog from '../catalog/catalog';
import Main from '../main/main';
import NotFound from '../not-found/not-found';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main />
        </Route>
        <Route path={`${AppRoute.Catalog}/:page`} exact>
          <Catalog />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
