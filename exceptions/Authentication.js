import ClientError from './ClientError';

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'Authentication Error';
  }
}

export default AuthenticationError;
