import mongoose from 'mongoose';

export async function clearCollections() {
    const models = Object.keys(mongoose.connection.models);
    for (const name of models) {
        const model = mongoose.connection.models[name];
        try {
            await model.deleteMany({});
        } catch (err) {
            // ignore
        }
    }
}

export async function seedProducts(products: any[]) {
    const Product = mongoose.models.Product || (await import('../../../backend/models/Product')).default;
    await Product.insertMany(products);
}
