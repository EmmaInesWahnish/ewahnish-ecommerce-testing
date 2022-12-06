import renderModalAddToCart from './renderModalAddToCart.js'
import build_header from './getHeader.js';

const createACart = (cart, quantity, product) => {

    let cartId = '';

    let headers_object = build_header()

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
        let cartProduct = {
            id: product.id,
            timestamp: product.timestamp,
            nombre: product.nombre,
            descripcion: product.descripcion,
            codigo: product.codigo,
            foto: product.foto,
            precio: product.precio,
            stock: product.stock,
            cantidad: quantity
        }
        const productRoute2 = `/api/carrito/${cartId}/productos`
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartProduct),
        };
    
        fetch(productRoute2, requestOptions)
            .then(async res => {
                await res.json();
            })
            .catch(error => {
                console.log('Se produjo el siguiente error: ', error);
            })
    
        return cartId;
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);    
    })
    
}

export default createACart;
