import { ITokenUtils } from '../api/apiClientBase';
import { msalInstance } from '..';
import { tokenRequest } from './authConfig';

export class TokenUtils implements ITokenUtils {
  async getToken(): Promise<string> {
    const response = await msalInstance.acquireTokenSilent(tokenRequest);
    return response.accessToken;
  }
}
