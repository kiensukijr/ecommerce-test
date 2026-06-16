import { ApiClient } from './ApiClient';

export class AuthClient {
    private client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async register(name: string, email: string, password: string) {
        return this.client.post('/api/auth/register', { name, email, password });
    }

    async login(email: string, password: string) {
        return this.client.post('/api/auth/login', { email, password });
    }

    async me(token: string) {
        return this.client.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
    }
}
