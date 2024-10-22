const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { Pool } = require('pg');

const packageDefinition = protoLoader.loadSync('product.proto');
const productProto = grpc.loadPackageDefinition(packageDefinition).ProductService;

const pool = new Pool({
    user: 'desarrolladores',
    host: 'localhost',
    database: 'northwind',
    password: '12345',
    port: 5432
});

const getProducts = async (call, callback) => {
    try {
        const result = await pool.query('SELECT * FROM products');
        const products = result.rows.map(row => ({
            product_id: row.product_id,
            product_name: row.product_name,
            price: row.price
        }));
        callback(null, { products });
    } catch (err) {
        callback(err);
    }
};

const getProductById = async (call, callback) => {
    const id = call.request.id;
    try {
        const result = await pool.query('SELECT * FROM products WHERE product_id = $1', [id]);
        if (result.rows.length > 0) {
            const product = result.rows[0];
            callback(null, {
                product_id: product.product_id,
                product_name: product.product_name,
                price: product.price
            });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Producto no encontrado'
            });
        }
    } catch (err) {
        callback(err);
    }
};

const server = new grpc.Server();
server.addService(productProto.service, { GetProducts: getProducts, GetProductById: getProductById });

server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Servidor gRPC escuchando en localhost:50051');
    server.start();
});
