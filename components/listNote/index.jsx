import { Fragment } from 'react';
import NoteCard from '@components/noteCard';
import PropTypes from 'prop-types';

function ListNote({ notes }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 flex-1">
        {notes.map((note, i) => (
          <Fragment key={i.toString()}>
            {i % 4 === 0 && (
              <NoteCard note={note} />
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {notes.map((note, i) => (
          <Fragment key={i.toString()}>
            {i % 4 === 1 && (
              <NoteCard note={note} />
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {notes.map((note, i) => (
          <Fragment key={i.toString()}>
            {i % 4 === 2 && (
              <NoteCard note={note} />
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {notes.map((note, i) => (
          <Fragment key={i.toString()}>
            {i % 4 === 3 && (
              <NoteCard note={note} />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

ListNote.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListNote;
