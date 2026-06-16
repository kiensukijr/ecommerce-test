import { disconnectDB } from './tests/config/db';

async function globalTearDown() {
    await disconnectDB();
}
export default globalTearDown;