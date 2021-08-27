import Link from 'next/link';
import PropTypes from 'prop-types';

function ProjectCard({ title, tasksDone, totalTask, color, href }) {
  let backgroundColor;
  let backgroundPercent;

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

  const percentDone = Math.round((tasksDone / totalTask) * 100);

  return (
    <Link href={href}>
      <a>
        <div className={`${backgroundColor} flex flex-col gap text-white p-4 rounded-lg`}>
          <p className="font-bold text-xl">{title}</p>
          <p className="my-3">{tasksDone} of {totalTask} tasks done</p>
          <div>
            <div className="bg-white h-2 rounded-xl">
              <div className={`${backgroundPercent} h-full rounded xl`} style={{ width: `${percentDone}%` }} />
            </div>
            <div className="flex justify-between mt-1">
              <p>Progress</p>
              <p>{percentDone}%</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  tasksDone: PropTypes.number.isRequired,
  totalTask: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default ProjectCard;
