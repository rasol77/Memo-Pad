import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToken } from '../../Context/TokenContext';
import { TokenProvider } from '../../Context/TokenContext';
import './UpdateNote.css';

const UpdateNote = () => {
  const [token] = useToken(TokenProvider);
  const navigate = useNavigate();

  //Variables del Estado.
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  //Si no existe el token o se ha escrito bien la nota le mandamos al Home.
  if (!token) return <Navigate to={'/'} />;

  const handleSubmit = async (e, id) => {
    e.preventDefault(e);

    setLoading(true);

    try {
      //Enviamos un form/data para Enviar al server.
      const formData = new FormData();

      //Push the elements with the method append.
      formData.append('title', title);
      formData.append('image', file);
      formData.append('text', text);
      formData.append('category', category);

      const res = await fetch(`http://localhost:4000/notes/${id}`, {
        method: 'PUT',
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
    <main className="UpdateNote">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          type="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="File"
          type="file"
          name="title"
          onChange={(e) => setFile(e.target.file[0])}
        />
        <textarea
          placeholder="Write Other Note"
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

export default UpdateNote;
