import build_header from './getHeader.js';
import { LocalStorageService } from './localStorageService.js';

let headers_object = build_header();

const emptyACart = (cartId) => {

    const productRoute = `/api/carrito/${cartId}/empty`

    const requestOptions = {
        method: 'POST',
        headers: headers_object,
    };

    fetch(productRoute, requestOptions)
        .then(async res => {
            await res.json();
        })
        .catch(error => {
            console.log('Se produjo el siguiente error: ', error);
        })

}

export default emptyACart;
