import { test, expect } from '../fixtures/db.fixture';
import User from '../models/User';
import { userList } from '../data/user.data';

for (const user of userList) {

    test(`Check user ${user.email} exists in DB`, async () => {

        const dbUser = await User.findOne({ email: user.email });

        expect(dbUser).not.toBeNull();
    });
}
