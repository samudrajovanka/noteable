import AuthenticationError from '@exceptions/Authentication';
import ClientError from '@exceptions/ClientError';
import connectDb from '@lib/connectDb';
import { clientErrRes, notAllowedErrRes, serverErrRes } from '@lib/errorResponse';
import NoteService from '@services/databases/NoteService';
import noteValidation from '@validations/note';
import { getSession } from 'next-auth/client';

async function handler(req, res) {
  const noteService = new NoteService();

  let session;
  let emailUser;
  try {
    session = await getSession({ req });

    emailUser = session.user.email;
    if (!session) {
      throw new AuthenticationError('No authenticated');
    }
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).json(clientErrRes(error));
    }

    return res.status(500).json(serverErrRes(error));
  }

  switch (req.method) {
    case 'GET':
      try {
        const notes = await noteService.getNotes(emailUser);

        return res.status(200).json({
          success: true,
          length: notes.length ?? 0,
          data: {
            notes,
          },
        });
      } catch (error) {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json(clientErrRes(error));
        }

        return res.status(500).json(serverErrRes(error));
      }
    case 'POST':
      try {
        const { title, description, color } = req.body;

        noteValidation.validateNotePayload(req.body);

        const noteId = await noteService.createNote(emailUser, { title, description, color });

        return res.status(201).json({
          success: true,
          message: 'Note successfull created',
          note: {
            id: noteId,
          },
        });
      } catch (error) {
        if (error instanceof ClientError) {
          return res.status(error.statusCode).json(clientErrRes(error));
        }

        return res.status(500).json(serverErrRes(error));
      }
    default:
      return res.status(400).json(notAllowedErrRes());
  }
}

export default connectDb(handler);
