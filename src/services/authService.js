import client from '../lib/axios';

class authService {
  static async login(credentials) {
    return client.post('/auth/login', credentials);
  }
}

export default authService;
