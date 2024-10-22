const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('products.proto');
const productProto = grpc.loadPackageDefinition(packageDefinition).ProductService;

const client = new productProto('localhost:50051', grpc.credentials.createInsecure());

client.GetProducts({}, (error, response) => {
    if (!error) {
        console.log('Productos:', response.products);
    } else {
        console.error('Error:', error);
    }
});

client.GetProductById({ id: 1 }, (error, response) => {
    if (!error) {
        console.log('Producto:', response);
    } else {
        console.error('Error:', error);
    }
});
