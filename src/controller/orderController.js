import config from '../configurations/dotenvConfig.js';
import {
    getAllOrders,
    getOrdersById,
    saveOrders,
    saveOrdersArray,
    modifyOrderById,
    deleteOrderById,
    deleteProdInOrder
} from '../services/OrderService.js'

const whichDb = config.envs.SELECTED_DB;

export const ordersGetAll = async (req, res) => {
    let user_fname = req.session.user.first_name;
    let user_lname = req.session.user.last_name;
    try {
        const order = await getAllOrders();
        res.json({
            message: 'Ordenes ',
            user_fname: user_fname,
            user_lname: user_lname,
            order: order,
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

export const ordersGetOneById = async (req, res) => {
    let id = req.params.id;
    let user_fname = req.session.user.first_name;
    let user_lname = req.session.user.last_name;
    try {
        const order = await getOrdersById(id);
        console.log("Order ", order)
        if (order != undefined) {
            res.json({
                message: 'orden encontrada',
                user_fname: user_fname,
                user_lname: user_lname,
                order: order,
                whichDb: whichDb
            })
        } else {
            res.json({
                message: "orden no encontrada"
            })
        }
    }
    catch (error) {
        res.json({
            message: "Se produjo un error al buscar el orden",
            error: error
        })
    }
}

export const ordersGenerateOne = async (req, res) => {
    let receive = req.body;
    let orden = {
        user_id: req.session.user.id,
        timestamp: receive.timestamp,
        productos: receive.productos,
    }

    let orderId
    if (orden) {
        try {
            const theProductId = await saveOrders(orden)
            try {
                const orden = await getAllOrders();
                if (whichDb === 'FIREBASE') {
                    orderId = theProductId;
                }
                else {
                    orderId = orden[orden.length - 1].id;
                }


                res.json({
                    message: "Orden incorporada",
                    orden: orden,
                    orderId: orderId,
                    whichDb: whichDb
                })
            }
            catch (error) {
                res.json({
                    message: 'No se ha podido recuperar la lista de productos',
                    error: error
                })
            }
        }
        catch (error) {
            res.json({
                message: 'No se ha podido guardar la orden',
                error: error
            })
        }
    } else {
        res.json({
            message: "Los datos suministrados son incorrectos"
        })
    }

}

export const ordersDeleteOne = async (req, res) => {
    const id = req.params.id;
    try {
        const removedCart = await deleteOrderById(id);

        if (removedCart.length === 0) {
            res.json({
                message: "El orden solicitado no existe"
            })
        } else {
            res.json({
                message: "El orden ha sido eliminado",
                product: removedCart
            })
        }
    }
    catch (error) {
        res.json({
            message: "El orden no pudo ser eliminado",
            error: error
        })
    }
}
 