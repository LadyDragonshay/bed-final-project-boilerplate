//src/errors/emptyFieldsError.js
class emptyFieldsError extends Error {
    constructor(message = 'Required fields are missing') {
      super(message);
      this.name = 'emptyFieldsError';
      this.code = 400;  // HTTP 400: Bad Request
    }
}

export default emptyFieldsError;