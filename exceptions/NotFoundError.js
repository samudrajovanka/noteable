import ClientError from './ClientError';

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'Not Found Error';
  }
}

export default NotFoundError;
