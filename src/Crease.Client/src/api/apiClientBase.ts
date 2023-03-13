export interface ITokenUtils {
  getToken(): Promise<string>;
}

export class ApiClientBase {
  private readonly config: ITokenUtils;

  protected constructor(config: ITokenUtils) {
    this.config = config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async transformOptions(options: any): Promise<any> {
    const token = await this.config.getToken();
    options.headers['Authorization'] = `Bearer ${token}`;
    return Promise.resolve(options);
  }
}
