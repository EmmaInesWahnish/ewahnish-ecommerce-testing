import showOneProduct from './showOneProduct.js';
import build_header from './getHeader.js';
import { LocalStorageService } from './localStorageService.js';

let headers_object = build_header();

const modifyOneProduct = (modifiedProduct) => {

    let newProduct = LocalStorageService.getItem("newProduct");

    const productRoute = `/api/productos/${modifiedProduct.id}`

    const requestOptions = {
        method: 'PUT',
        headers: headers_object,
        body: JSON.stringify(modifiedProduct),
    };

    fetch(productRoute, requestOptions)
        .then(async res => {
            const data = await res.json();
            if (newProduct !== null) {
                if (!newProduct.isNew) {
                    alert('Modificación exitosa');
                    let productId = modifiedProduct.id;
                    showOneProduct(productId);
                }
            } else {
                alert('Modificación exitosa');
                let productId = modifiedProduct.id;
                showOneProduct(productId);
            }
        })
        .catch(error => {
            console.log('Se produjo el siguiente error: ', error);
        })

}

export default modifyOneProduct;
