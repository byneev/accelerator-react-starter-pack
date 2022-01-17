import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import Main from '../main/main';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path={`${AppRoute.Main}`} exact>
          <Main />
        </Route> */}
        <Route path={`${AppRoute.Catalog}/:page`} exact>
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
