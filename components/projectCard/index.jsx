import Button from '@components/button';
import ProjectsContext from '@context/projectsContext';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useContext } from 'react';

function ProjectCard({ id, title, tasksDone, totalTask, color, status }) {
  const projectsCtx = useContext(ProjectsContext);
  let backgroundColor;
  let backgroundPercent;
  let textColor = 'text-white';

  if (color === 'green') {
    backgroundColor = 'bg-na-green';
    backgroundPercent = 'bg-na-yellow';
  } else if (color === 'red') {
    backgroundColor = 'bg-na-red';
    backgroundPercent = 'bg-na-violet';
  } else if (color === 'yellow') {
    backgroundColor = 'bg-na-yellow';
    backgroundPercent = 'bg-na-red';
  } else if (color === 'violet') {
    backgroundColor = 'bg-na-violet';
    backgroundPercent = 'bg-na-green';
  }

  if (status === 'complete') {
    backgroundColor = 'bg-white border border-na-gray';
    textColor = 'text-na-black';
  }

  const percentDone = Math.round((tasksDone / totalTask) * 100);

  const textDesc = {
    new: `${totalTask} tasks inside`,
    uncomplete: `${tasksDone} of ${totalTask} tasks done`,
    complete: `${totalTask} tasks done`,
  };

  const handlerStart = async () => {
    const data = {
      status: 'uncomplete',
    };

    const result = await projectsCtx.updateProject(id, data);

    if (!result.success) {
      console.error(result.message);
    }
  };

  return (
    <div className={`${backgroundColor} ${textColor} flex flex-col gap p-4 rounded-lg`}>
      <Link href={`projects/${id}`}>
        <a className="font-semibold text-xl">{title}</a>
      </Link>

      <div>
        {status === 'new' && (
          <>
            <p className="my-3">{textDesc[status]}</p>
            <Button type="secondary" color="success" onClick={handlerStart}>Start</Button>
          </>
        )}

        {status === 'uncomplete' && (
          <>
            <p className="my-3">{textDesc[status]}</p>
            <div className="bg-white h-2 rounded-xl">
              <div className={`${backgroundPercent} h-full rounded xl`} style={{ width: `${percentDone}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <p>Progress</p>
              <p>{percentDone}%</p>
            </div>
          </>
        )}

        {status === 'complete' && (
          <div className="flex flex-row justify-between items-center">
            <p className="my-3">{textDesc[status]}</p>
            <div className="mt-1 flex justify-center items-center bg-na-green rounded-full w-10 h-10">
              <p className="text-white">{percentDone}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  tasksDone: PropTypes.number.isRequired,
  totalTask: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default ProjectCard;
