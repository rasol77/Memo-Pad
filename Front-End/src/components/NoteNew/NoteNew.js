import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToken } from '../../Context/TokenContext';
import './NoteNew.css';

const NoteNew = () => {
  //Hooks del TOKEN.
  const [token] = useToken();
  const navigate = useNavigate();

  //Variables del Estado.
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  //Si no existe el token o se ha escrito bien la nota le mandamos al .
  if (!token) return <Navigate to={'/'} />;

  //Función manejadora del  envio de formulario.
  const handleSubmit = async (e) => {
    e.preventDefault(e);

    setLoading(true);

    try {
      //Enviamos un form/data  para enviarlo.
      const formData = new FormData();

      //Introducimos los elementos con el método  adjuntar.
      formData.append('title', title);
      formData.append('image', file);
      formData.append('text', text);
      formData.append('category', category);

      const res = await fetch('http://localhost:4000/notes', {
        method: 'POST',
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      const body = await res.json();

      if (body.status === 'error') {
        window.alert(body.message);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="NoteNew">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          type="title"
          name="title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <textarea
          placeholder="Write Note"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
        />

        <input
          placeholder="Category"
          type="category"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />

        <button disabled={loading}>Enviar</button>
      </form>
    </main>
  );
};

export default NoteNew;
