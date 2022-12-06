import getUserCart from "./getUserCart.js";
import build_header from "./getHeader.js";

let headers_object = build_header();

const requestOptionsGet = {
    method: 'GET',
    headers: headers_object
}

const getAllCarts = async () => {

    const cartRoute = `/api/carrito`

    let allCarts = [];

    let cart_number = '0';

    fetch(cartRoute, requestOptionsGet)
        .then(res => res.json())
        .then(data => {
            if (data.carrito !== undefined) {
                allCarts = [...data.carrito];                
            }
            cart_number = getUserCart(allCarts);
            console.log(cart_number);
            return cart_number;
        })
        .catch (err => console.log(err))

}

export default getAllCarts;
