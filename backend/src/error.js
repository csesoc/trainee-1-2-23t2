class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}

class AccessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccessError';
  }
}

module.exports = { InputError, AccessError };
