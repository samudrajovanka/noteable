import Button from '@components/button';
import PinIcon from '@components/icon/pin';
import PinFillIcon from '@components/icon/pinFill';
import { fetchApi } from '@lib/fetching';
import { useEffect, useState } from 'react';
import style from './style.module.css';

function NoteCard({ id, color, title, description, pinned }) {
  const [isPinned, setIsPinned] = useState(pinned);
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (isPinned) {
      setIcon(<PinFillIcon />);
    } else {
      setIcon(<PinIcon />);
    }
  }, [isPinned]);

  let borderColor;
  if (color === 'green') {
    borderColor = 'border-na-green';
  } else if (color === 'red') {
    borderColor = 'border-na-red';
  } else if (color === 'yellow') {
    borderColor = 'border-na-yellow';
  } else if (color === 'violet') {
    borderColor = 'border-na-violet';
  }

  const handlerEdit = () => {
    console.log('cocote');
  };

  const handlerDelete = () => {
    console.log('cocote v2.0');
  };

  const togglePin = async () => {
    const result = await fetchApi(`/api/notes/${id}`, {
      method: 'PUT',
      body: {
        pinned: !isPinned,
      },
    });
    if (!result.succes) {
      console.log('berhasil');
    }
  };

  return (
    <div
      className={`flex flex-col bg-white border ${borderColor} rounded-md p-3 gap-1 ${style.note_card}`}
    >
      <div className="flex flex-row justify-between">
        <p className="font-bold text-lg">{title}</p>
        <i
          className={`cursor-pointer opacity-0 transition-all ${style.icon}`}
          onClick={togglePin}
        >
          {icon}
        </i>
      </div>
      <p className="text-na-gray">{description}</p>
      <div
        className={`grid grid-cols-2 gap-3 opacity-0 transition-all ${style.button_container}`}
      >
        <Button type="primary" color="warning" onClick={handlerEdit}>
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
