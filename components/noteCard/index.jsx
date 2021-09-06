import Button from '@components/button';
import PinIcon from '@components/icon/pin';
import PinFillIcon from '@components/icon/pinFill';
import NotesContext from '@context/notesContext';
import { useContext } from 'react';
import style from './style.module.css';

function NoteCard({ note }) {
  const notesCtx = useContext(NotesContext);

  let icon;
  if (note.pinned) {
    icon = <PinFillIcon />;
  } else {
    icon = <PinIcon />;
  }

  let borderColor;
  if (note.color === 'green') {
    borderColor = 'border-na-green';
  } else if (note.color === 'red') {
    borderColor = 'border-na-red';
  } else if (note.color === 'yellow') {
    borderColor = 'border-na-yellow';
  } else if (note.color === 'violet') {
    borderColor = 'border-na-violet';
  }

  const handlerDelete = () => {
    console.log('cocote v2.0');
  };

  const togglePin = async () => {
    const body = {
      pinned: !note.pinned,
    };
    const result = await notesCtx.updateNote(note.id, body);

    if (!result.success) {
      console.error(result.message);
    }
  };

  return (
    <div
      className={`flex flex-col bg-white border ${borderColor} rounded-md p-3 gap-1 ${style.note_card}`}
    >
      <div className="flex flex-row justify-between">
        <p className="font-bold text-lg">{note.title}</p>
        <i
          className={`cursor-pointer opacity-0 transition-all ${style.icon}`}
          onClick={togglePin}
        >
          {icon}
        </i>
      </div>
      <p className="text-na-gray">{note.description}</p>
      <div
        className={`grid grid-cols-2 gap-3 opacity-0 transition-all ${style.button_container}`}
      >
        <Button href={`notes/${note.id}/edit`} type="primary" color="warning">
          Edit
        </Button>
        <Button type="primary" color="danger" onClick={handlerDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default NoteCard;
