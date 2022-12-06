
import CartModel from "../../../src/Models/cart.js";
import MongoDbContainer from '../../api/MongoDbContainer.js';

const TheModel = CartModel;

class CartsDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

export default CartsDaoMongoDb;