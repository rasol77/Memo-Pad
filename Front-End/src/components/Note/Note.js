import './Note.css';
import { format } from 'date-fns';
import { useToken } from '../../Context/TokenContext';

const Note = (note, notes, setNotes) => {
  //Hooks del TOKEN.
  const [token] = useToken();
  const dateTime = format(new Date(note.createdAt), 'yyyy-MM-dd');

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
        {token && note.owner === 1 && <button>Borrar Nota </button>}
      </footer>
    </li>
  );
};

export default Note;
