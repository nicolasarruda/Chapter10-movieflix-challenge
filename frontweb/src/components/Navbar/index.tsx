import Button from 'components/Button';
import './styles.css';
import { isAuthenticated, getTokenData } from '../../utils/auth';
import { useEffect, useContext } from 'react';
import { removeAuthData } from '../../utils/storage';
import history from 'utils/history';

import { AuthContext } from 'AuthContext';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar bg-primary main-nav">
      <div className="container-fluid">
        <div className="nav-logo">
          <h1>MovieFlix</h1>
        </div>
        {authContextData.authenticated ? (
          <a href="#logout" onClick={handleLogoutClick}>
            <Button name="sair" />
          </a>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
