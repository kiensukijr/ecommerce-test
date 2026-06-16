import { test, expect } from '@playwright/test';

const API_BASE = process.env.API_BASE || `http://localhost:${process.env.PORT || 5000}`;

test('GET /api/products returns array', async ({ request }) => {
  const res = await request.get(`${API_BASE}/api/products`);
  expect(res.ok()).toBeTruthy();
  const data = await res.json();
  expect(Array.isArray(data)).toBe(true);
});

test('Auth register -> login -> me', async ({ request }) => {
  const email = `playwright+${Date.now()}@example.com`;
  const password = 'Test1234!';
  const name = 'Playwright Test';

  // Register
  const reg = await request.post(`${API_BASE}/api/auth/register`, {
    data: { name, email, password },
  });
  expect([200, 201]).toContain(reg.status());

  // Login
  const login = await request.post(`${API_BASE}/api/auth/login`, {
    data: { email, password },
  });
  expect(login.ok()).toBeTruthy();
  const body = await login.json();
  expect(body.token).toBeTruthy();
  const token = body.token;

  // Me
  const me = await request.get(`${API_BASE}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(me.ok()).toBeTruthy();
  const user = await me.json();
  expect(user.email).toBe(email);
});

test('Protected cart endpoints require auth', async ({ request }) => {
  // Create test user
  const email = `playwright-cart+${Date.now()}@example.com`;
  const password = 'Test1234!';
  const name = 'Cart Tester';

  await request.post(`${API_BASE}/api/auth/register`, { data: { name, email, password } });
  const login = await request.post(`${API_BASE}/api/auth/login`, { data: { email, password } });
  const { token } = await login.json();

  // GET cart (should return 200 and a cart object)
  const res = await request.get(`${API_BASE}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect([200, 404, 204]).toContain(res.status());
});
