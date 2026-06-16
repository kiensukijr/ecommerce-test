import { test, expect, request } from '@playwright/test';
import { userLoginPass, userLoginFail } from '../../data/userlogin.data';

for (const user of userLoginPass) {
    test(`Login API test pass ${user.email}`, async () => {

        const apiContext = await request.newContext();

        const response = await apiContext.post('http://localhost:5000/api/auth/login', {
            data: {
                email: user.email,
                password: user.password
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log(body);
    });
}

for (const user of userLoginFail) {
    test(`Login API test fail ${user.email}`, async () => {

        const apiContext = await request.newContext();

        const response = await apiContext.post('http://localhost:5000/api/auth/login', {
            data: {
                email: user.email,
                password: user.password
            }
        });

        expect(response.status()).toBe(401);

        const body = await response.json();
        console.log(body);
    });
}