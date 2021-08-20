import ClientError from '@exceptions/ClientError';
import connectDb from '@lib/connectDb';
import NoteService from '@services/databases/NoteService';
import noteValidation from '@validations/note';

async function handler(req, res) {
  const noteService = new NoteService();

  switch (req.method) {
    case 'GET':
      try {
        const notes = await noteService.getNotes();

        return res.status(200).json({
          success: true,
          length: notes.length ?? 0,
          data: {
            notes,
          },
        });
      } catch (error) {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    case 'POST':
      try {
        const { title, description, color } = req.body;

        noteValidation.validateNotePayload(req.body);

        const idNote = await noteService.createNote({ title, description, color });

        return res.status(201).json({
          success: true,
          message: 'Note successfull created',
          note: {
            id: idNote,
          },
        });
      } catch (error) {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json({
            success: false,
            message: error.message,
          });
        }

        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    default:
      return res.status(400).json({
        success: false,
        message: 'Method not allowed',
      });
  }
}

export default connectDb(handler);
