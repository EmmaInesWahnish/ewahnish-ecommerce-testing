
import ProductModel from "../../../src/Models/products.js";
import MongoDbContainer from '../../api/MongoDbContainer.js';

const TheModel = ProductModel;

class ProductsDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

export default ProductsDaoMongoDb;