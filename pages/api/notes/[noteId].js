import ClientError from '@exceptions/ClientError';
import connectDb from '@lib/connectDb';
import NoteService from '@services/databases/NoteService';
import noteValidation from '@validations/note';

async function handler(req, res) {
  const noteService = new NoteService();

  switch (req.method) {
    case 'GET':
      try {
        const { noteId } = req.query;

        const note = await noteService.getNoteById(noteId);

        return res.status(200).json({
          success: true,
          data: {
            note,
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
    case 'PUT':
      try {
        const { noteId } = req.query;

        const { title, description, color, pinned } = req.body;

        if (!title && !description && !color && pinned === undefined) {
          return res.status(200).json({
            success: true,
            message: 'Note is up to date',
          });
        }

        noteValidation.validateNoteUpdatePayload(req.body);

        await noteService.updateNote(noteId, {
          title, description, color, pinned,
        });

        return res.status(200).json({
          success: true,
          message: 'Note updated successfully',
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
    case 'DELETE':
      try {
        const { noteId } = req.query;

        await noteService.deleteNote(noteId);

        return res.status(200).json({
          success: true,
          message: 'Note deleted successfully',
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
