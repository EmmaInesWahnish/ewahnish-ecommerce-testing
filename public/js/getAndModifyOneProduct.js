import renderHome from './renderHome.js';
import build_header from './getHeader.js';
import { LocalStorageService } from './localStorageService.js';
import getImage from './getImage.js';
import modifyOneProduct from './modifyOneProduct.js';

let headers_object = build_header();

const requestOptionsGet = {
    method: 'GET',
    headers: headers_object
}

const getAndModifyOneProduct = async (productId) => {
    
    await getImage();

    let newProduct = LocalStorageService.getItem("newProduct");

    const productRoute = `/api/productos/${productId}`

    fetch(productRoute, requestOptionsGet)
        .then(res => res.json())
        .then(data => {
            if (data.message === "Producto no encontrado") {
                alert("Producto no encontrado");
                renderHome();
            } else {
                let product = data.product
                if (product.id === undefined) {
                    product = data.product[0]
                }
                if ((newProduct != null) && (newProduct.isNew)) {
                    let auxurl = LocalStorageService.getItem("image");
                    product.foto = auxurl;
                    modifyOneProduct(product);
                }
            }
        })
        .catch(err => console.log(err))
}

export default getAndModifyOneProduct;
