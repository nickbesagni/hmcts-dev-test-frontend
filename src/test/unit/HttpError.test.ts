import { HTTPError } from '../../main/HttpError';

describe('HTTPError', () => {
  it('should create an instance of HttpError with the correct status and message', () => {
    const status = 404;
    const message = 'Not Found';
    const error = new HTTPError(message, status);

    expect(error).toBeInstanceOf(HTTPError);
    expect(error.status).toBe(status);
    expect(error.message).toBe(message);
  });

  it('should have a name property set to "Error"', () => {
    const error = new HTTPError('Internal Server Error', 500);
    expect(error.name).toBe('Error');
  });
});
