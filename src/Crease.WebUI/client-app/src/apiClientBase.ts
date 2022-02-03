export class ApiClientBase {
  private authToken = '';

  setAuthToken(token: string) {
    this.authToken = token;
  }

  protected transformOptions(options: any): Promise<any> {
    options.headers['Authorization'] = `Bearer ${this.authToken}`;
    return Promise.resolve(options);
  }
}
