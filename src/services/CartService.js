import { persistence }  from "../persistence/PersistenceFactory.js";

    let Cart = persistence.Carts;

    const getAllCarts = async () => {
        return await Cart.getAll();
    }

    const getCartsById = async (id) => {
        return await Cart.getById(id);
    }

    const saveCarts = async (carrito) => {
        return await Cart.save(carrito);
    }

    const saveCartsArray = async (array) => {
        return await Cart.saveArray(array);
    }

    const modifyCartById = async (id, modifiedCart) => {
        return await Cart.modifyById(id, modifiedCart);
    }

    const deleteCartById = async (id) => {
        return await Cart.deleteById(id);
    }

    const deleteProdInCart = async (id, id_prod, indexp, productArray) => {
        return await Cart.deleteProdById(id, id_prod, indexp, productArray)
    }


export {
    getAllCarts,
    getCartsById,
    saveCarts,
    saveCartsArray,
    modifyCartById,
    deleteCartById,
    deleteProdInCart
}
