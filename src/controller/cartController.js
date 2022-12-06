import config from '../configurations/dotenvConfig.js';
import {
    getAllCarts,
    getCartsById,
    saveCarts,
    saveCartsArray,
    modifyCartById,
    deleteCartById,
    deleteProdInCart
} from '../services/CartService.js'

const whichDb = config.envs.SELECTED_DB;

export const cartsGetAll = async (req, res) => {
    try {
        const array = await getAllCarts();
        res.json({
            message: 'Carritos ',
            carrito: array,
            whichDb: whichDb
        });
    }
    catch (error) {
        res.json({
            message: 'No se ha podido recuperar la lista de carritos',
            error: error
        })
    }
}

export const cartsGetById = async (req, res) => {
    let id = req.params.id;
    try {
        const carrito = await getCartsById(id);
        if (carrito != undefined) {
            res.json({
                message: 'carrito encontrado',
                carrito: carrito,
                whichDb: whichDb
            })
        } else {
            res.json({
                message: "carrito no encontrado"
            })
        }
    }
    catch (error) {
        res.json({
            message: "Se produjo un error al buscar el carrito",
            error: error
        })
    }
}

export const cartsAddOne = async (req, res) => {
    let receive = req.body;
    let carrito = {
        user_id: req.session.user.id,
        timestamp: receive.timestamp,
        productos: receive.productos,
    }
    if (carrito) {
        let cartId
        try {
            const theProductId = await saveCarts(carrito)
            try {
                const carrito = await getAllCarts();
                if (whichDb === 'FIREBASE') {
                    cartId = theProductId;
                }
                else {
                    cartId = carrito[carrito.length - 1].id;
                }

                let cart_number = {
                    cart_number: cartId
                }

                res.json({
                    message: "Carrito incorporado",
                    carrito: carrito,
                    cartId: cartId,
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

export const cartsUpdateOne = async (req, res) => {
    const id = req.params.id;
    let indexc = 0
    let indexp = 0
    let receive = req.body;
    let searchedCart = [];
    let carts = [];
    let modifiedCart = [];

    try {
        let productArray = [];
        carts = await getAllCarts();
        indexc = carts.findIndex(element => element.id == id);
        console.log("Entra al primer try ", indexc)
        if (indexc !== -1) {
            searchedCart = carts[indexc];
            let cartId = searchedCart.id;
            let cartTimestamp = searchedCart.timestamp;
            if ((whichDb === 'SQL') || (whichDb === 'MARIADB')) {
                if ((searchedCart.productos != null)) {
                    productArray = JSON.parse(carts[indexc].productos);
                }
            } else {
                productArray = searchedCart.productos;
            }
            indexp = productArray.findIndex(element => element.id == receive.id);
            if (indexp !== -1) {
                productArray[indexp].cantidad = receive.cantidad;
            }
            else {
                console.log("recibo ", receive)
                productArray.push(receive);
                modifiedCart = {
                    id: cartId,
                    timestamp: cartTimestamp,
                    productos: productArray
                }
            }
            if ((whichDb === 'SQL') || (whichDb === 'MARIADB')) {
                modifiedCart = {
                    id: cartId,
                    timestamp: cartTimestamp,
                    productos: JSON.stringify(productArray)
                }
            }
            else {
                modifiedCart = {
                    id: cartId,
                    timestamp: cartTimestamp,
                    productos: productArray
                }
            }
            try {
                await modifyCartById(cartId, modifiedCart);
                res.json({
                    message: 'Modificacion exitosa',
                    product: modifiedCart,
                    cartId: cartId,
                    whichDb: whichDb,
                    user: req.session
                })
            }
            catch (error) {
                res.json({
                    message: 'No fue posible cargar los productos',
                    error: error
                })
            }

        }
        else {
            res.json({
                message: 'Carrito no encontrado',
            })
        }
    }
    catch (error) {
        res.json({
            message: 'Ha ocurrido un error al intentar recuperar la lista de carritos',
            error: error
        })
    }
}

export const cartsDeleteOneProduct = async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod
    try {
        let productArray = [];
        const carts = await getAllCarts();
        const indexc = carts.findIndex(element => element.id == id);
        const searchedCart = carts[indexc];
        if ((whichDb === 'SQL') || (whichDb === 'MARIADB')) {
            if ((searchedCart.productos != null)) {
                productArray = JSON.parse(carts[indexc].productos);
            }
        } else {
            productArray = searchedCart.productos;
        }
        if (indexc !== -1) {
            const indexp = productArray.findIndex(element => element.id == id_prod);
            if (indexp !== -1) {
                try {
                    await deleteProdInCart(id, id_prod, indexp, productArray);
                    res.json({
                        message: 'Eliminacion exitosa',
                    })
                }
                catch (error) {
                    res.json({
                        message: 'No fue posible eliminar el producto del carrito',
                        error: error
                    })
                }

            } else {
                res.json({
                    message: 'el producto no se encuentra en el carrito'
                })
            }
            res.json({
                message: 'carrito no encontrado'
            })
        }
    }
    catch (error) {

    }

}

export const cartsDeleteOne = async (req, res) => {
    let cart_number = {
        cart_number: ""
    }

    const id = req.params.id;
    try {
        const removedCart = await deleteCartById(id);
    
        if (removedCart.length === 0) {
            res.json({
                message: "El carrito solicitado no existe"
            })
        } else {

            res.json({
                message: "El carrito ha sido eliminado",
                product: removedCart
            })
        }
    }
    catch (error) {
        res.json({
            message: "El carrito no pudo ser eliminado",
            error: error
        })
    }
}

export const cartsOneEmpty = async (req, res) => {

    let productArray = [];
    let carts = await getAllCarts();
    let indexc = 0;
    let modifiedCart = {};

    const id = req.params.id;

    indexc = carts.findIndex(element => element.id == id);

    if (indexc !== -1) {
        const searchedCart = carts[indexc];
        if ((whichDb === 'SQL') || (whichDb === 'MARIADB')) {
            modifiedCart = {
                id: searchedCart.id,
                timestamp: searchedCart.timestamp,
                user_id: searchedCart.user_id,
                productos: JSON.stringify(productArray)
            }
        }
        else {
            modifiedCart = {
                id: searchedCart.id,
                timestamp: searchedCart.timestamp,
                user_id: searchedCart.user_id,
                productos: productArray
            }
        }
        try {
            await modifyCartById(id, modifiedCart);
            res.json({
                message: 'Modificacion exitosa',
                product: modifiedCart,
                cartId: id,
                whichDb: whichDb,
                user: req.session
            })
        }
        catch (error) {
            res.json({
                message: 'No fue posible eliminar los productos',
                error: error
            })
        }
    }
    else {
        res.json({
            message: 'carrito no encontrado'
        })
    }
}
