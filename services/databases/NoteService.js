import InvariantError from '@exceptions/InvariantError';
import NotFoundError from '@exceptions/NotFoundError';
import { mapNoteToModel } from '@lib/formatData';
import Note from '@models/NoteModel';

class NoteService {
  async getNotes(email) {
    const notes = await Note.find({ owner: email }).sort({ created_at: 'desc' });
    const notesFormated = notes.map((note) => mapNoteToModel(note));

    return notesFormated;
  }

  async createNote(email, { title, description, color }) {
    const notesExist = await Note.find({ owner: email });

    if (notesExist.length + 1 > 31) {
      throw new InvariantError('Note is maximum 31 items');
    }

    const dateNow = Date.now();

    const newNote = new Note({
      owner: email,
      title,
      description,
      color,
      created_at: dateNow,
      updated_at: dateNow,
    });

    const note = await newNote.save();

    if (!note) {
      throw new InvariantError('Error create note. Try again');
    }

    return note._id;
  }

  async getNoteById(email, id) {
    const notes = await Note.find({ owner: email, _id: id });

    const note = notes[0];
    if (!note) {
      throw new NotFoundError('Note not found');
    }

    return mapNoteToModel(note);
  }

  async updateNote(email, id, { title, description, color, pinned }) {
    const notes = await Note.find({ owner: email, _id: id });

    const note = notes[0];
    if (!note) {
      throw new NotFoundError('Note not found');
    }

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    note.color = color ?? note.color;
    note.pinned = pinned ?? note.pinned;
    note.updatedAt = new Date();
    await note.save();
  }

  async deleteNote(email, id) {
    const notes = await Note.find({ owner: email, _id: id });

    const note = notes[0];
    if (!note) {
      throw new NotFoundError('Note not found');
    }

    await Note.deleteOne({ _id: id });
  }
}

export default NoteService;
