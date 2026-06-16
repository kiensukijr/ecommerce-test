import { APIRequestContext } from '@playwright/test';

export class ApiClient {
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl.replace(/\/$/, '');
    }

    async get(path: string, options: any = {}) {
        return this.request.get(`${this.baseUrl}${path}`, options);
    }

    async post(path: string, data: any, options: any = {}) {
        return this.request.post(`${this.baseUrl}${path}`, { data, ...options });
    }

    async put(path: string, data: any, options: any = {}) {
        return this.request.put(`${this.baseUrl}${path}`, { data, ...options });
    }

    async delete(path: string, options: any = {}) {
        return this.request.delete(`${this.baseUrl}${path}`, options);
    }
}
