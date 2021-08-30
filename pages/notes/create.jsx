import Button from '@components/button';
import ButtonBack from '@components/buttonBack';
import ColorStyle from '@components/colorStyle';
import TextInput from '@components/textInput';
import Title from '@components/title';
import { fetchApi } from '@lib/fetching';
import { getSession } from 'next-auth/client';
import { useState } from 'react';

function NotesPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('green');

  const handlerTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlerDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlerChangeColor = (colorChange) => {
    setColor(colorChange);
  };

  const handlerCreateNote = async (e) => {
    e.preventDefault();

    const body = {
      title,
      description,
      color,
    };

    const result = await fetchApi('/api/notes', {
      method: 'POST',
      body,
    });

    console.log(result);
  };

  return (
    <div>
      <div className="mb-5">
        <ButtonBack />
      </div>
      <Title>Create New Note</Title>
      <div className="grid grid-cols-12 w-full gap-4 mt-4">
        <form className="flex flex-col col-span-8 gap-10" onSubmit={handlerCreateNote}>
          <div className="flex flex-col gap-5">
            <TextInput
              type="text"
              id="title"
              placeholder="Title of the note"
              title="Title"
              value={title}
              onChange={handlerTitle}
              required
            />
            <TextInput
              type="text"
              id="description"
              placeholder="Description your note..."
              title="Description"
              value={description}
              onChange={handlerDescription}
              isLarge
              required
            />
          </div>
          <Button typeButton="submit">
            Create
          </Button>
        </form>
        <div className="bg-na-light-green col-span-4 p-4 rounded-lg h-1/2">
          <p>Border Color</p>
          <ColorStyle colorActive={color} handlerChangeColor={handlerChangeColor} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default NotesPage;
