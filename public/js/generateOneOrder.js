import renderModalUserOrder from "./renderModalUserOrder.js";
import build_header from "./getHeader.js";

let headers_object = build_header();

const createAnOrder = (cart) => {

    let orderId = '';

    let user_cart = cart.user_cart;

    const orderRoute = `/api/ordenes/`

    const requestOptions = {
        method:'POST',
        headers: headers_object,
        body: JSON.stringify(cart),
    };

    fetch(orderRoute, requestOptions)
    .then(async res => {

        const data = await res.json();

        console.log("Viene en la orden >>>> ", data);
        
        orderId = data.orderId;

        renderModalUserOrder(orderId, user_cart)

    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);    
    })
    
}

export default createAnOrder;
