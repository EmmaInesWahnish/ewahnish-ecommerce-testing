import showOneProduct from './showOneProduct.js'
import build_header from './getHeader.js';

const addOneProduct = (addedProduct) => {

    const productRoute = `/api/productos/`;

    let headers_object = build_header();

    const requestOptions = {
        method:'POST',
        headers: headers_object,
        body: addedProduct,
    };

    fetch(productRoute, requestOptions)
    .then(async res => {
        await res.json();
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);
    })
    
}

export default addOneProduct;
