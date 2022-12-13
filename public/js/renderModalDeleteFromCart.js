import build_header from "./getHeader.js";

let headers_object = build_header();

const renderModalDeleteFromCart = (productId, cartId) => {
    const productRoute = `/api/carrito/${cartId}/productos/${productId}`

    fetch(productRoute, {
        method: 'DELETE',
        headers: headers_object
    })
        .then(async res => {
            
            const data = await res.json();
        
        })
        .catch(err => console.log(err))
}

export default renderModalDeleteFromCart;