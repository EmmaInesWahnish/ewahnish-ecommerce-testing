import build_header from './getHeader.js';

let headers_object = build_header();

const deleteACart = (cartId) => {
    const productRoute = `/api/carrito/${cartId}`

    fetch(productRoute, {
        method: 'DELETE',
        headers: headers_object})
        .then(async res => {

            await res.json();

        })
        .catch(err => console.log(err))
}

export default deleteACart;
