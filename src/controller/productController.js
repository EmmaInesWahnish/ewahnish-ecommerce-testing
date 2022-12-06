import {
    getAllProducts,
    getProductsById,
    saveProducts,
    saveProductsArray,
    modifyProductById,
    deleteProductById
}
    from '../services/ProductService.js'
import config from '../configurations/dotenvConfig.js';
import usersService from '../Models/Users.js';
import fs from 'fs';

let whichDb = config.envs.SELECTED_DB
let cartNumber;
let result;

export const productsGetAll = async (req, res) => {
    try {
        const array = await getAllProducts();
        res.json({
            message: 'Lista de productos ',
            products: array,
            whichDb: whichDb,
            user: result
        });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de productos',
            error: error
        })
    }
}

export const productsGetById = async (req, res) => {
    let id = req.params.id;
    try {
        const producto = await getProductsById(id);
        if (producto != undefined) {
            res.json({
                message: 'Producto encontrado',
                product: producto,
                whichDb: whichDb
            })
        } else {
            res.json({
                message: "Producto no encontrado"
            })
        }
    }
    catch (error) {
        res.json({
            message: "Se produjo un error al buscar el producto",
            error: error
        })
    }
}

export const productsAddOne = async (req, res) => {
    let receive = req.body;
    let producto = {
        timestamp: Date.now(),
        nombre: receive.nombre,
        descripcion: receive.descripcion,
        codigo: receive.codigo,
        foto: receive.foto,
        precio: receive.precio,
        stock: receive.stock
    }
    if (producto) {
        try {
            const theProductId = await saveProducts(producto);
            try {
                const products = await getAllProducts();
                res.json({
                    message: "Producto incorporado",
                    product: producto,
                    theProductId: theProductId,
                    whichDb: whichDb
                })
            }
            catch (error) {
                res.json({
                    message: 'No se ha podido obtener la lista de productos',
                    error: error
                })
            }
        }
        catch (error) {
            res.json({
                message: 'No se ha podido guardar el producto',
                error: error
            })
        }
    } else {
        res.json({
            message: "Los datos suministrados son incorrectos"
        })
    }

}

export const productsUpdateOne = async (req, res) => {
    const id = req.params.id;
    let receive = req.body;
    try {
        const products = await getAllProducts();
        const index = products.findIndex(element => element.id == id);
        let searchedProduct = products[index];
        if (index !== -1) {

            if (receive.nombre !== null && receive.nombre !== undefined) {
                products[index].nombre = receive.nombre;
            }
            if (receive.descripcion !== null && receive.descripcion !== undefined) {
                products[index].descripcion = receive.descripcion;
            }
            if (receive.codigo !== null && receive.codigo !== undefined) {
                products[index].codigo = receive.codigo;
            }
            if (receive.foto !== null && receive.foto !== undefined) {
                products[index].foto = receive.foto;
            }
            if (receive.precio !== null && receive.precio !== undefined) {
                products[index].precio = receive.precio;
            }
            if (receive.stock !== null && receive.stock !== undefined) {
                products[index].stock = receive.stock;
            }

            searchedProduct = products[index];
            //The array gets updated here
            let array = [];

            products.forEach((element) => {
                array.push({
                    timestamp: element.timestamp,
                    nombre: element.nombre,
                    descripcion: element.descripcion,
                    codigo: element.codigo,
                    foto: element.foto,
                    precio: element.precio,
                    stock: element.stock

                })
            })
            //productos.json file is replaced with the updated array
            if (config.envs.SELECTED_DB === "FILE") {
                try {
                    await fs.promises.unlink('./DB/productos.json');
                    try {
                        await saveProductsArray(array);
                        res.json({
                            message: 'Modificacion exitosa',
                            product: array,
                            whichDb: whichDb
                        })
                    }
                    catch (error) {
                        res.json({
                            message: 'No fue posible cargar los productos en productos.txt',
                            error: error
                        })
                    }
                }
                catch (error) {
                    res.json({
                        message: 'No se pudo borrar el archivo productos.txt',
                        error: error
                    })
                }

            }
            else {
                try {
                    await modifyProductById(id, searchedProduct);
                    res.json({
                        message: 'Modificacion exitosa',
                        product: array,
                        whichDb: whichDb
                    })
                }
                catch (error) {
                    res.json({
                        message: 'No fue posible modificar el producto',
                        error: error
                    })
                }
            }
        } else {
            res.json({
                message: 'Producto no encontrado'
            })
        }
    }
    catch (error) {
        res.json({
            message: 'Ha ocurrido un error al intentar recuperar la lista de productos',
            error: error
        })
    }

}

export const productsDeleteOne = async (req, res) => {
    const id = req.params.id;
    let producto = []
    try {
        producto = await getProductsById(id);
        if (producto.length != 0) {
            try {
                const removedProduct = await deleteProductById(id);
                res.json({
                    message: "El producto ha sido eliminado",
                    product: removedProduct,
                    whichDb: whichDb
                })
            }
            catch (error) {
                res.json({
                    message: "El producto no pudo ser eliminado",
                    error: error
                })
            }
        } else {
            res.json({
                message: "Producto no encontrado"
            })
        }
    }
    catch (error) {
        res.json({
            message: "Se produjo un error al buscar el producto",
            error: error
        })
    }

}
