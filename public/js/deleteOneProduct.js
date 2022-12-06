import build_header from './getHeader.js';
import renderProducts from './renderProducts.js'

let headers_object = build_header();

const deleteOneProduct = (productId) => {

    const productRoute = `/api/productos/${productId}`

    fetch(productRoute, {
        method: 'DELETE',
        headers: headers_object
    })
        .then(async res => {
            
            const data = await res.json();
            renderProducts();
        
        })
        .catch(err => console.log(err))
}

export default deleteOneProduct;
