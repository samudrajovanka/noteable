import ClientError from './ClientError';

class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'Invariant Error';
  }
}

export default InvariantError;
