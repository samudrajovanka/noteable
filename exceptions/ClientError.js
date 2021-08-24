class ClientError extends Error {
  constructor(message, type = null, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
  }
}

export default ClientError;
