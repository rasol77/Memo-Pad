import { useState } from 'react';
import { useToken } from '../../Context/TokenContext';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useToken();

  const userData = async () => {
    try {
      const res = await fetch('http://localhost:4000/user', {
        headers: {
          Authorization: token,
        },
      });

      const body = await res.json();

      if (body.status === 'ok') {
        setUsername(body.data.user.username);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (token) userData();

  return (
    <header>
      <h1>
        <NavLink to="/">Note Pad</NavLink>
      </h1>
      {token && <p>@{username}</p>}
      <nav>
        {!token && (
          <div className="button">
            <NavLink to="/login">Login</NavLink>
          </div>
        )}
        {!token && (
          <div className="button">
            <NavLink to="/signup">SignUp</NavLink>
          </div>
        )}
        {token && (
          <div className="Mensagge">
            <NavLink to="/note">Note</NavLink>
          </div>
        )}

        {token && (
          <div className="Logout" onClick={() => setToken(null)}>
            <p>Logout</p>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
