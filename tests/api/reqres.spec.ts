import { test, expect, request, APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.API_KEY!;
let apiContext: APIRequestContext;

test.beforeEach(async () => {
    apiContext = await request.newContext({
        extraHTTPHeaders: {
            'x-api-key': API_KEY
        }
    });
});

test('GET user - status 200', async () => {
    const response = await apiContext.get('https://reqres.in/api/users/2');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBe('janet.weaver@reqres.in');
    expect(body.data.first_name).toBe('Janet');
});

test('GET user - status 404', async () => {
    const response = await apiContext.get('https://reqres.in/api/users/999');

    expect(response.status()).toBe(404);
});

test('POST user - status 201', async () => {
    const response = await apiContext.post('https://reqres.in/api/users/', {
        data: {
            name: 'Name1',
            email: 'email1@example.com'
        }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe('Name1');
    expect(body.email).toBe('email1@example.com');
    expect(body.id).toBeDefined();
});

test('PUT user - status 200', async () => {
    const response = await apiContext.put('https://reqres.in/api/users/2', {
        data: {
            name: 'newName2',
            email: 'newemail2@example.com'
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('newName2');
    expect(body.email).toBe('newemail2@example.com');
});

test('DELETE user - status 204', async () => {
    const response = await apiContext.delete('https://reqres.in/api/users/2');
    expect(response.status()).toBe(204);
});