import InvariantError from '@exceptions/InvariantError';
import NotFoundError from '@exceptions/NotFoundError';
import { mapNoteToModel } from '@lib/formatData';
import Note from '@models/NoteModel';

class NoteService {
  async getNotes() {
    const notes = await Note.find();
    const notesFormated = notes.map((note) => mapNoteToModel(note));

    return notesFormated;
  }

  async createNote({ title, description, color }) {
    const newNote = new Note({
      title,
      description,
      color,
    });

    const note = await newNote.save();

    if (!note) {
      throw new InvariantError('Error create note. Try again');
    }

    return note._id;
  }

  async getNoteById(id) {
    const note = await Note.findById(id);

    if (!note) {
      throw new NotFoundError('Note not found');
    }

    return mapNoteToModel(note);
  }

  async updateNote(id, { title, description, color, pinned }) {
    const note = await Note.findById(id);

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

  async deleteNote(id) {
    const note = await Note.findById(id);

    if (!note) {
      throw new NotFoundError('Note not found');
    }

    await Note.deleteOne({ _id: id });
  }
}

export default NoteService;
