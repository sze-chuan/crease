export class ApiClientBase {
  private authToken = '';

  setAuthToken(token: string) {
    this.authToken = token;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected transformOptions(options: any): Promise<any> {
    options.headers['Authorization'] = `Bearer ${this.authToken}`;
    return Promise.resolve(options);
  }
}
