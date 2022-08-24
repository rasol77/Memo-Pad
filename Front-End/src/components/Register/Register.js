import { useState } from 'react';
import { useToken } from '../../Context/TokenContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useMessage } from '../../Context/MessageContext';
import './Register.css';

const Register = () => {
  //Varios Ganchos.
  const [token] = useToken();
  const navigate = useNavigate();
  const [, setMessage] = useMessage();

  //Hooks para usar en el registro
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  //Redireccionamos al Home Page.
  if (token) return <Navigate to="/" />;

  //Función manejadora para enviar el formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const body = await res.json();

      setMessage({
        status: body.status,
        text: body.message,
      });

      //Si el registro ha sido correcto mandamos al usuario al login.
      if (body.status === 'ok') navigate('/login');
    } catch (error) {
      setMessage({
        status: 'error',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="Register">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseñas:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>Sign Up</button>
      </form>
    </main>
  );
};

export default Register;
