import Button from '@components/button';
import ButtonBack from '@components/buttonBack';
import ColorStyle from '@components/colorStyle';
import Notification from '@components/notification';
import TextInput from '@components/textInput';
import Title from '@components/title';
import NotesContext from '@context/notesContext';
import NotificationContext from '@context/notificationContext';
import { MAX_ERR } from '@lib/constantErrorType';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function FormNote({ note, type }) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [errorMsg, setErrorMsg] = useState({
    title: '',
    description: '',
  });
  const [description, setDescription] = useState(note?.description ?? '');
  const [color, setColor] = useState(note?.color ?? 'green');
  const [disableBtn, setDisableBtn] = useState(true);
  const router = useRouter();
  const notesCtx = useContext(NotesContext);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (
      errorMsg.title !== '' ||
      errorMsg.description !== '' ||
      title === '' ||
      description === ''
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [errorMsg, title, description]);

  const handlerTitle = (e) => {
    setTitle(e.target.value);

    if (e.target.value.length === 0) {
      setErrorMsg((curEl) => ({ ...curEl, title: '' }));
    } else if (e.target.value.length < 5) {
      setErrorMsg((curEl) => ({ ...curEl, title: 'Title min 5 character' }));
    } else if (e.target.value.length > 30) {
      setErrorMsg((curEl) => ({ ...curEl, title: 'Title max 30 character' }));
    } else {
      setErrorMsg((curEl) => ({ ...curEl, title: '' }));
    }
  };

  const handlerDescription = (e) => {
    setDescription(e.target.value);

    if (e.target.value.length > 300) {
      setErrorMsg((curEl) => ({ ...curEl, description: 'Description max 300 character' }));
    } else {
      setErrorMsg((curEl) => ({ ...curEl, description: '' }));
    }
  };

  const handlerChangeColor = (colorChange) => {
    setColor(colorChange);
  };

  const handlerCreateNote = async (e) => {
    e.preventDefault();
    notificationCtx.showNotification({
      title: 'Creating note...',
      status: 'pending',
    });

    const newNote = {
      title,
      description,
      color,
    };

    const result = await notesCtx.addNote(newNote);

    if (result.success) {
      notificationCtx.hideNotification();
      router.replace('/notes');
    } else if (result.type === MAX_ERR) {
      notificationCtx.showNotification({
        title: 'You have reached the maximum note limit (max 31)',
        status: 'error',
      });
    } else {
      notificationCtx.showNotification({
        title: result.message,
        status: 'error',
      });
    }
  };

  const handlerEditNote = async (e) => {
    e.preventDefault();
    notificationCtx.showNotification({
      title: 'Updating note...',
      status: 'pending',
    });

    const data = {
      title,
      description,
      color,
    };

    const result = await notesCtx.updateNote(note.id, data);

    if (result.success) {
      notificationCtx.hideNotification();
      router.replace('/notes');
    } else {
      notificationCtx.showNotification({
        title: result.message,
        status: 'error',
      });
    }
  };

  const handlerSubmit = async (e) => {
    if (type === 'create') {
      await handlerCreateNote(e);
    } else if (type === 'edit') {
      await handlerEditNote(e);
    }
  };

  return (
    <>
      <div className="mb-5">
        <ButtonBack />
      </div>

      {type === 'create' && (<Title>Create New Note</Title>)}
      {type === 'edit' && (<Title>Edit Note</Title>)}

      <Notification className="mt-2" />

      <div className="grid grid-cols-12 w-full gap-4 mt-4">
        <form className="flex flex-col col-span-8 gap-10" onSubmit={handlerSubmit}>
          <div className="flex flex-col gap-5">
            <TextInput
              type="text"
              id="title"
              placeholder="Title of the note"
              title="Title"
              value={title}
              onChange={handlerTitle}
              required
              errorMsg={errorMsg.title}
            />
            <div>
              <TextInput
                type="text"
                id="description"
                placeholder="Description your note..."
                title="Description"
                value={description}
                onChange={handlerDescription}
                isLarge
                required
                errorMsg={errorMsg.description}
              />
              <p className={`text-xs ${errorMsg.description.length > 0 ? 'text-na-red' : ''}`}>{description.length}/300</p>
            </div>
          </div>

          <Button typeButton="submit" disabled={disableBtn}>
            {type === 'create' && ('Create')}
            {type === 'edit' && ('Save')}
          </Button>
        </form>

        <div className="bg-na-light-green col-span-4 p-4 rounded-lg h-1/2">
          <p>Border Color</p>
          <ColorStyle colorActive={color} handlerChangeColor={handlerChangeColor} />
        </div>
      </div>
    </>
  );
}

FormNote.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FormNote;
