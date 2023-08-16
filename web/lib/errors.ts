export class ServerError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ValidationError extends Error {
  errors: { [key: string]: string };
  constructor(message: string, errors: { [key: string]: string } = {}) {
    super(message);
    this.errors = errors;
  }
}

export class LogicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ConflictingError extends Error {
  constructor(message: string) {
    super(message);
  }
}
