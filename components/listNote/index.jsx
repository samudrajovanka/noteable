import NoteCard from '@components/noteCard';
import PropTypes from 'prop-types';

function ListNote({ notes }) {
  return (
    <div className="flex gap-2 my-2">
      {notes.map((note, i) => (
        <>
          <div className="flex flex-col gap-2 flex-1">
            {i % 4 === 0 && (
              <NoteCard
                key={note.id}
                title={note.title}
                description={note.description}
                color={note.color}
                id={note.id}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {i % 4 === 1 && (
              <NoteCard
                key={note.id}
                title={note.title}
                description={note.description}
                color={note.color}
                id={note.id}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {i % 4 === 2 && (
              <NoteCard
                key={note.id}
                title={note.title}
                description={note.description}
                color={note.color}
                id={note.id}
              />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {i % 4 === 3 && (
              <NoteCard
                key={note.id}
                title={note.title}
                description={note.description}
                color={note.color}
                id={note.id}
              />
            )}
          </div>
        </>
      ))}
    </div>
  );
}

ListNote.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListNote;
