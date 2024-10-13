//src/errors/notFoundError.js
class notFoundError extends Error {
    constructor(resourceType, id) {
      super(`${resourceType} with id ${id} was not found!`);
      this.name = 'notFoundError';
      this.code = 404;  // HTTP 404: Not Found
    }
}

export default notFoundError;
