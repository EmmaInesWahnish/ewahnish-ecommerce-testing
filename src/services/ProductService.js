import { persistence } from "../persistence/PersistenceFactory.js";

let Products = persistence.Products;

const getAllProducts = async () => {
    return await Products.getAll();
}

const getProductsById = async (id) => {
    return await Products.getById(id);
}

const saveProducts = async (producto) => {
    return await Products.save(producto);
}

const saveProductsArray = async () => {
    return await Products.saveArray();
}

const modifyProductById = async (id, searchedProduct) => {
    return await Products.modifyById(id, searchedProduct);
}

const deleteProductById = async (id) => {
    return await Products.deleteById(id);
}

export {
    getAllProducts,
    getProductsById, 
    saveProducts, 
    saveProductsArray,
    modifyProductById,
    deleteProductById
} 
