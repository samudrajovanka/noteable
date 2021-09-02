import { fetchApi } from '@lib/fetching';

const { createContext, useState, useEffect } = require('react');

const NotesContext = createContext({
  notes: [],
  setNotes: (notes) => {},
  notesPinned: [],
  setNotesPinned: (notes) => {},
  notesUnpinned: [],
  setNotesUnpinned: (notes) => {},
  refreshNotes: () => {},
  addNote: (note) => {},
  updateNote: (id, data) => {},
  deleteNote: (noteId) => {},
});

export const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [notesPinned, setNotesPinned] = useState([]);
  const [notesUnpinned, setNotesUnpinned] = useState([]);

  useEffect(() => {
    setNotesPinned(notes.filter((note) => note.pinned));
    setNotesUnpinned(notes.filter((note) => !note.pinned));
  }, [notes]);

  const addNote = async (note) => {
    const result = await fetchApi('/api/notes', {
      method: 'POST',
      body: note,
    });

    if (result.success) {
      setNotes([note, ...notes]);
    }

    return result;
  };

  const updateNote = async (id, data) => {
    const result = await fetchApi(`/api/notes/${id}`, {
      method: 'PUT',
      body: data,
    });

    if (result.success) {
      setNotes((curEl) => {
        const index = curEl.findIndex((el) => el.id === id);
        const newEl = [...curEl];
        newEl[index] = {
          ...newEl[index],
          ...data,
        };

        return newEl;
      });
    }

    return result;
  };

  const deleteNote = async (noteId) => {
    const result = await fetchApi(`/api/notes/${noteId}`, {
      method: 'DELETE',
    });

    if (result.success) {
      setNotes((curEl) => curEl.filter((el) => el.id !== noteId));
    }

    return result;
  };

  const context = {
    notes,
    setNotes,
    notesPinned,
    setNotesPinned,
    notesUnpinned,
    setNotesUnpinned,
    addNote,
    updateNote,
    deleteNote,
  };

  return (
    <NotesContext.Provider value={context}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
