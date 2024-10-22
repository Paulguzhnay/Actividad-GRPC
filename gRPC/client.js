const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './product.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const productProto = grpc.loadPackageDefinition(packageDefinition).ProductService;

const client = new productProto('localhost:50051', grpc.credentials.createInsecure());

client.ListProducts({}, (error, response) => {
  if (!error) {
    console.log('Product List:', response.products);
  } else {
    console.error(error);
  }
});

client.GetProductById({ id: 1 }, (error, response) => {
  if (!error) {
    console.log('Product:', response);
  } else {
    console.error(error);
  }
});
