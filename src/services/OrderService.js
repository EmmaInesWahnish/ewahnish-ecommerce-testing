import { persistence }  from "../persistence/PersistenceFactory.js";

    let Order = persistence.Orders;

    const getAllOrders = async () => {
        return await Order.getAll();
    }

    const getOrdersById = async (id) => {
        return await Order.getById(id);
    }

    const saveOrders = async (carrito) => {
        return await Order.save(carrito);
    }

    const saveOrdersArray = async (array) => {
        return await Order.saveArray(array);
    }

    const modifyOrderById = async (id, modifiedCart) => {
        return await Order.modifyById(id, modifiedCart);
    }

    const deleteOrderById = async (id) => {
        return await Order.deleteById(id);
    }

    const deleteProdInOrder = async (id, id_prod, indexp, productArray) => {
        return await Order.deleteProdById(id, id_prod, indexp, productArray)
    }


export {
    getAllOrders,
    getOrdersById,
    saveOrders,
    saveOrdersArray,
    modifyOrderById,
    deleteOrderById,
    deleteProdInOrder
}
