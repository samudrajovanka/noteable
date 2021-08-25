import { NOT_FOUND_ERR } from '@lib/constantErrorType';
import ClientError from './ClientError';

class NotFoundError extends ClientError {
  constructor(message, type = NOT_FOUND_ERR) {
    super(message, type, 404);
    this.name = 'Not Found Error';
  }
}

export default NotFoundError;
