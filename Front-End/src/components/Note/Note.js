import './Note.css';
import { format } from 'date-fns';
import { useToken } from '../../Context/TokenContext';
import { useState } from 'react';

const Note = (note, notes, setNotes) => {
  //Hooks del TOKEN.
  const [token] = useToken();
  const dateTime = format(new Date(note.createdAt), 'yyyy-MM-dd');

  const getNote = async (e, idNote) => {
    try {
      const res = await fetch(`http://localhost:4000/notes/${idNote}`);

      const data = await res.json();

      //si no consigue acceder a la API damos error.
      if (data.status === 'error') {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="Note">
      <header>
        <p>@{note.username}</p>
        <time>{format(new Date(note.createdAt), 'hh:mm - dd/MM/yyyy')} </time>
      </header>
      <div>
        <h2>{note.title}</h2>
        <p>{note.text}</p>
      </div>
      <footer>
        <div></div>
        {token && note.owner === 1 && <button onClick>Borrar Nota </button>}
      </footer>
    </li>
  );
};

export default Note;
