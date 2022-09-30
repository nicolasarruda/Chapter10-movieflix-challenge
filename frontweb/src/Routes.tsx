import Navbar from 'components/Navbar';
import PrivateRoute from 'components/PrivateRoute';
import Login from 'pages/Login';
import MovieCatalog from 'pages/MovieCatalog';
import MovieDetails from 'pages/MovieCatalog/MovieDetails';
import { Router, Route, Switch } from 'react-router-dom';
import history from 'utils/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Login />
      </Route>
      <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <MovieCatalog />
        </Route>
        <Route path="/movies/:movieId/reviews">
          <MovieDetails />
        </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
