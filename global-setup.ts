import { connectDB } from './tests/config/db';

async function globalSetup() {
    await connectDB();
}

export default globalSetup;
