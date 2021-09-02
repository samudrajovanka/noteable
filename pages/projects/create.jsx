import TextInput from '@components/textInput';
import Button from '@components/button';
import ColorStyle from '@components/colorStyle';
import Title from '@components/title';
import { useContext, useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';
import ButtonBack from '@components/buttonBack';
import ProjectsContext from '@context/projectsContext';
import NotificationContext from '@context/notificationContext';
import { useRouter } from 'next/router';
import { MAX_ERR } from '@lib/constantErrorType';
import Notification from '@components/notification';

function CreateProjectsPage() {
  const [title, setTitle] = useState('');
  const [errorAddTask, setErrorAddTask] = useState(false);
  const [tasks, setTasks] = useState([{
    value: '',
    error: '',
  }]);
  const [errorMsg, setErrorMsg] = useState({
    title: '',
  });
  const [disableBtn, setDisableBtn] = useState(false);
  const [color, setColor] = useState('green');
  const projectsCtx = useContext(ProjectsContext);
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();

  useEffect(() => {
    if (
      errorMsg.title !== '' ||
      title === '' ||
      tasks[0] === '' ||
      tasks.some((task) => task.error !== '')
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [errorMsg, tasks]);

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

  const handlerTask = (e, index) => {
    const list = [...tasks];
    list[index].value = e.target.value;

    if (e.target.value.length === 0) {
      list[index].error = '';
    } else if (e.target.value.length < 5) {
      list[index].error = 'Task min 5 character';
    } else if (e.target.value.length > 30) {
      list[index].error = 'Task max 30 character';
    } else {
      list[index].error = '';
    }

    setTasks(list);
  };

  const handlerChangeColor = ((colorChange) => {
    setColor(colorChange);
  });

  const handlerPlusTask = () => {
    if (tasks[tasks.length - 1].value === '' ||
      tasks[tasks.length - 1].error !== '') {
      setErrorAddTask(true);
    } else {
      setErrorAddTask(false);
      setTasks((curEl) => [...curEl, { value: '', error: '' }]);
    }
  };

  const handlerRemoveTask = (e, index) => {
    if (e.target.value.length === 0 && index !== 0) {
      const list = [...tasks];
      list.splice(index, 1);
      setTasks(list);
    }
  };

  const handlerCreateProject = async (e) => {
    e.preventDefault();

    notificationCtx.showNotification({
      title: 'Creating project...',
      status: 'pending',
    });

    const filterTasks = tasks.map((task) => {
      if (task.value !== '') {
        return task.value;
      }

      return null;
    });

    const newProject = {
      name: title,
      tasks: filterTasks,
      color,
    };

    const result = await projectsCtx.addProject(newProject);

    if (result.success) {
      notificationCtx.hideNotification();
      router.replace('/projects');
    } else if (result.type === MAX_ERR) {
      notificationCtx.showNotification({
        title: 'You have reached the maximum project limit (max 31)',
        status: 'error',
      });
    } else {
      notificationCtx.showNotification({
        title: result.message,
        status: 'error',
      });
    }
  };

  return (
    <>
      <div className="mb-5">
        <ButtonBack />
      </div>

      <Title>Create New Project</Title>

      <Notification className="mt-2" />

      <div className="grid grid-cols-12 w-full gap-4 mt-4">
        <form className="flex flex-col col-span-8 gap-10" onSubmit={handlerCreateProject}>
          <div className="flex flex-col gap-5">
            <TextInput
              type="text"
              id="title"
              placeholder="Title of the project"
              title="Title"
              value={title}
              onChange={handlerTitle}
              required
              errorMsg={errorMsg.title}
            />

            <div>
              <p className="text-md text-na-black mb-1">Tasks</p>
              <div className="flex flex-col gap-2 mb-2">
                {tasks.map((task, index) => (
                  <TextInput
                    key={index.toString()}
                    type="text"
                    id="task"
                    placeholder={`Task ${index + 1}`}
                    value={task.value}
                    onChange={(e) => handlerTask(e, index)}
                    required
                    errorMsg={task.error}
                    onBlur={(e) => handlerRemoveTask(e, index)}
                  />
                ))}
              </div>

              {tasks.length < 30 && (
                <>
                  <Button type="secondary" onClick={handlerPlusTask}>
                    + Task
                  </Button>
                  {errorAddTask && (
                    <p className="text-xs text-na-red">Fill in the box that is already available</p>
                  )}
                </>
              )}
            </div>

            <Button typeButton="submit" disabled={disableBtn}>
              Create
            </Button>
          </div>
        </form>

        <div className="bg-na-light-green col-span-4 p-4 rounded-lg h-1/2">
          <p>Border Color</p>
          <ColorStyle colorActive={color} handlerChangeColor={handlerChangeColor} />
        </div>
      </div>
    </>
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

export default CreateProjectsPage;
