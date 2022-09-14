import './Note.css';
import { format } from 'date-fns';
import { useToken } from '../../Context/TokenContext';
import { useEffect, useState } from 'react';
import { Navigate, NavLink, useParams } from 'react-router-dom';

const Note = () => {
  //Hooks del TOKEN.
  const { id } = useParams();

  const [token] = useToken();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

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

  //Función para borrar una nota
  const deleteNote = async (id) => {
    setLoading(true);

    if (window.confirm('¿Quieres eliminar esta nota?')) {
      try {
        const res = await fetch(
          `
        http://localhost:4000/notes/${id}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: token,
            },
          }
        );

        const body = await res.json();

        if (body.status === 'error') {
          console.error('error');
        } else {
          setNote(body.note);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!token) return <Navigate to={'/login'} />;

  if (!note) return <p>Cargando...</p>;

  return (
    <li className="Note">
      <header>
        <p>@{note.username}</p>
        <time>{format(new Date(note.createdAt), 'HH:mm - dd/MM/yyyy')} </time>
      </header>
      <div>
        <h2>{note.title}</h2>
        <p>{note.text}</p>
        {note.image && (
          <img
            src={`http://localhost:4000/${note.image}`}
            alt="Imagen de la Nota"
          />
        )}
        <h5>{note.category}</h5>
      </div>

      <div>
        {token && (
          <button className="EditNote">
            <NavLink to={`edit/${note.idNote}`}>Modify</NavLink>
          </button>
        )}
        {token && (
          <button className="Trash" onClick={() => deleteNote(note.id)}>
            🗑️
          </button>
        )}
      </div>
    </li>
  );
};

export default Note;
