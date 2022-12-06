import express from 'express';
import { ordersGetAll, ordersGetOneById, ordersGenerateOne, ordersDeleteOne } from '../controller/orderController.js'

const routerOrder = express.Router();

// *** ROUTES ***
//This route returns all Orders
routerOrder.get('/', ordersGetAll); 

//This route returns a Order according to its id.
routerOrder.get('/:id', ordersGetOneById);

//This route generates one Order
routerOrder.post('/', ordersGenerateOne);

//This route removes the order with the selected id
routerOrder.delete('/:id', ordersDeleteOne);

export default routerOrder;