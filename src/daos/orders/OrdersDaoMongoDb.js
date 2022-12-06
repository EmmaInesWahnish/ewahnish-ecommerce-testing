
import OrderModel from "../../../src/Models/order.js";
import MongoDbContainer from '../../api/MongoDbContainer.js';

const TheModel = OrderModel;


class OrdersDaoMongoDb extends MongoDbContainer {

    constructor() {
        super()
        this.TheModel = TheModel;
    }

    async disconnect() {

    }
}

export default OrdersDaoMongoDb;