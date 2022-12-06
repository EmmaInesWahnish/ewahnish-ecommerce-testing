import build_header from './getHeader.js';

const createEmptyCart = (whichUser) => {

    let cartId = '';

    let headers_object = build_header();
    
    let cart = {
        timestamp: Date.now(),
        user_id:whichUser,
        productos: [],
    }

    const productRoute = `/api/carrito/`

    const requestOptions = {
        method:'POST',
        headers: headers_object,
        body: JSON.stringify(cart),
    };

    fetch(productRoute, requestOptions)
    .then(async res => {
        const data = await res.json();
        cartId = data.cartId;
        document.getElementById('activeCart').innerHTML = "";
        document.getElementById('activeCart').innerHTML = "Carrito Activo = ";
        document.getElementById('cartNumber').innerHTML = "";
        document.getElementById('cartNumber').innerHTML = cartId;
        document.getElementById('active').innerHTML = "";
        document.getElementById('active').innerHTML = "Nro ";
        document.getElementById('thisCart').innerHTML = "";
        document.getElementById('thisCart').innerHTML = cartId;
        return cartId;
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);    
    })
    
}

export default createEmptyCart;
