import renderHome from './renderHome.js';
import build_header from './getHeader.js';

let headers_object = build_header();

const requestOptionsGet = {
    method: 'GET',
    headers: headers_object
}

const getOneProduct = async (productId) => {
    
    const productRoute = `/api/productos/${productId}`

    fetch(productRoute, requestOptionsGet)
        .then(res => res.json())
        .then(data => {
            if (data.message === "Producto no encontrado") {
                alert("Producto no encontrado");
                renderHome();
            } else {
                let product = data.product
                if (product.id === undefined){
                    product = data.product[0]
                }
                return product;
            }
        })
        .catch(err => console.log(err))
}

export default getOneProduct;
