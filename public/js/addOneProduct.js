import showOneProduct from './showOneProduct.js';
import build_header from './getHeader.js';
import { LocalStorageService } from './localStorageService.js'

const addOneProduct = async (addedProduct) => {

    let productId = '';

    const productRoute = `/api/productos/`;

    let headers_object = build_header();

    const requestOptions = {
        method: 'POST',
        headers: headers_object,
        body: JSON.stringify(addedProduct),
    };

    fetch(productRoute, requestOptions)
        .then(async res => {
            const data = await res.json();
            let productId
            const theProductId = data.theProductId;
            productId = theProductId;
            let newProduct = {
                product_id: productId,
                isNew: true
            };
            LocalStorageService.setItem("newProduct", newProduct);
            //showOneProduct(productId);
        })
        .catch(error => {
            console.log('Se produjo el siguiente error: ', error);
        })

}

export default addOneProduct;
