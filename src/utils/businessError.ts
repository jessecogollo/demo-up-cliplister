export default class BusinessError extends Error {
  domainName: string;

  constructor(message: string, domainName: string) {
    super(message);

    this.domainName = domainName;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
