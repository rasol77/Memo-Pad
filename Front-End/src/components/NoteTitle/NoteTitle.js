import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useToken } from '../../Context/TokenContext';
import './NoteTitle.css';

import Note from '../Note/Note';

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
        const params = token ? { headers: { Authorization: token } } : {};

        const res = await fetch('http://localhost:4000/notes', params);

        const body = await res.json();

        if (body.status === 'error') {
          window.alert(body.message);
        } else {
          setNotes(body.data.notes);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, setNotes]);

  //Función encargada del evento de formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    //Si tenemos ek token lo mandamos por las cabezeras.
    const params = token ? { headers: { Authorization: token } } : {};

    try {
      const res = await fetch(
        `http://localhost:4000/notes?keyword=${keyword}`,
        params
      );
    } catch (error) {}
  };

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
              <Note
                key={note.title}
                note={note}
                notes={notes}
                setNotes={setNotes}
              />
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default NoteTitle;
