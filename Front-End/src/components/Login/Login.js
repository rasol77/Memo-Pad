import { useState } from 'react';
import { useToken } from '../../Context/TokenContext';

import './Login.css';

const Login = () => {
  //Gancho del Token
  const [token, setToken] = useToken();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //Función manejadora para enviar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const body = await res.json();

      if (body.status === 'error') {
        //Mensaje de error por mal login.
        window.alert(body.message);
      } else {
        window.alert('Login Succesfull');

        //Actulizar el TOKEN.
        setToken(body.data.token);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="Login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading}>Login</button>
      </form>
    </main>
  );
};
export default Login;
