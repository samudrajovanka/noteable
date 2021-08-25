import { NOT_ALLOWED_ERR, PERMISSION_ERR, SERVER_ERR } from './constantErrorType';

export const serverErrRes = (error) => ({
  success: false,
  message: error.message,
  type: SERVER_ERR,
});

export const notAllowedErrRes = () => ({
  success: false,
  message: 'Method not allowed',
  type: NOT_ALLOWED_ERR,
});

export const clientErrRes = (error) => ({
  success: false,
  message: error.message,
  type: error.type,
});

export const permissionErrRes = () => ({
  success: false,
  message: 'You not allowed to access this resource',
  type: PERMISSION_ERR,
});
