import './Note.css';
import { format } from 'date-fns';
import { useToken } from '../../Context/TokenContext';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const Note = () => {
  //Hooks del TOKEN.
  const { id } = useParams();

  const [token] = useToken();

  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await fetch(`http://localhost:4000/notes/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        const { data } = await res.json();

        //si no consigue acceder a la API damos error.
        if (data.status === 'error') {
          console.error('error');
        } else {
          setNote(data.note);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (token) getNote();
  }, [id, token]);

  if (!token) return <Navigate to={'/login'} />;

  if (!note) return <p>Cargando...</p>;

  return (
    <li className="Note">
      <header>
        <p>@{note.username}</p>
        <time>{format(new Date(note.createdAt), 'hh:mm - dd/MM/yyyy')} </time>
      </header>
      <div>
        <h2>{note.title}</h2>
        <p>{note.text}</p>
        <img
          src={`http://localhost:4000${note.image}`}
          alt="Imagen de la Nota"
        />
        <h5>{note.Category}</h5>
      </div>
      <footer>{<button onClick>Borrar Nota </button>}</footer>
    </li>
  );
};

export default Note;
