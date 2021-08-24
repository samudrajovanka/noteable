import ClientError from './ClientError';

class InvariantError extends ClientError {
  constructor(message, type = null) {
    super(message, type);
    this.name = 'Invariant Error';
  }
}

export default InvariantError;
