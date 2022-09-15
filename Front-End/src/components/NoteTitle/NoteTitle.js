import { useEffect, useState } from 'react';

import { useToken } from '../../Context/TokenContext';
import './NoteTitle.css';

// import Note from '../Note/Note';
import { Link, Navigate } from 'react-router-dom';

const NoteTitle = () => {
  //Hooks del TOKEN.
  const [token] = useToken();

  //Variables del State.
  const [keyword, setKeyword] = useState('');
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);

  //Usamos  -UseEffect para cargar las notas cuando abrimos la página.

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const params = { headers: { Authorization: token } };

        const res = await fetch('http://localhost:4000/notes', params);

        const body = await res.json();

        if (body.status === 'error') {
          window.alert(body.message);
        } else {
          setNotes(body.data.title);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchData();
  }, [token, setNotes]);

  //Función encargada del evento de formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    //Si tenemos el token lo mandamos por las cabezeras.
    const params = { headers: { Authorization: token } };
    try {
      const res = await fetch(
        `http://localhost:4000/notes/?${keyword}`,
        params
      );
      const body = await res.json();

      //Mandamos el error.
      if (body.status === 'error') {
        window.alert(body.message);
      } else {
        setNotes(body.note);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <Navigate to={'/login'} />;

  return (
    <main className="NoteTitle">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="keyword"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button disabled={loading}>Buscar</button>
      </form>

      {notes && (
        <ul className="NoteList">
          {notes.map((note) => {
            return (
              <li className="List" key={note.id}>
                <Link to={`/note/${note.id}`}>{note.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default NoteTitle;
