import { test, expect } from '../../test-setup';

test.describe('Database integration tests', () => {
    test.afterEach(async ({ db }) => {
        const { default: Product } = await import('../../../backend/models/Product');
        await Product.deleteMany({ name: 'Playwright DB Product' });
    });

    test('insert and remove product', async ({ db }) => {
        const { default: Product } = await import('../../../backend/models/Product');

        const doc = await Product.create({
            name: 'Playwright DB Product',
            price: 1.23,
            category: 'Test',
            description: 'Test product',
        });

        expect(doc._id).toBeTruthy();

        await Product.deleteOne({ _id: doc._id });

        const found = await Product.findById(doc._id);
        expect(found).toBeNull();
    });
});