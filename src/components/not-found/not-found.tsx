import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';

function NotFound(): JSX.Element {
  return (
    <div className='wrapper'>
      <h1>Page not found</h1>
      <Link to={AppRoute.Main}>Перейти на главную</Link>
    </div>
  );
}

export default NotFound;
