import { AUTHENTICATION_ERR } from '@lib/constantErrorType';
import ClientError from './ClientError';

class AuthenticationError extends ClientError {
  constructor(message, type = AUTHENTICATION_ERR) {
    super(message, type, 401);
    this.name = 'Authentication Error';
  }
}

export default AuthenticationError;
