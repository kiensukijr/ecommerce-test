import { test, expect, request } from '@playwright/test';
import { userRegisterPass, userRegisterFail } from '../../data/register.data';

for (const user of userRegisterPass) {
    test(`Register API test pass ${user.email}`, async () => {
        
        const apiContext = await request.newContext();

        const response = await apiContext.post('http://localhost:5000/api/auth/register', {
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }

        });
        
        expect(response.status()).toBe(201)

        const body = await response.json()
        console.log(body)
    })

}