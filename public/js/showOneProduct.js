import renderHome from './renderHome.js';
import build_header from './getHeader.js';

let headers_object = build_header();

const requestOptionsGet = {
    method: 'GET',
    headers: headers_object
}

const renderProducts = (productId) => {

    document.getElementById('activeCart').innerHTML = "";
    document.getElementById('cartNumber').innerHTML = "";
    document.getElementById('productCards').innerHTML = "";
    document.getElementById('newProduct').innerHTML = "";
    document.getElementById('oneProduct').innerHTML = "";
    document.getElementById('myCart').innerText = "";
    document.getElementById('productsInCart').innerHTML = "";
    document.getElementById('login').innerHTML = "";
    document.getElementById('register').innerHTML = "";
    document.getElementById('logout').innerHTML = "";
    document.getElementById('root').innerHTML = "";
    document.getElementById('orderButtons').innerHTML = "";

    const homePage = document.getElementById("homePage")

    let show = function (elem) {
        elem.style.display = 'block';
    };
    let hide = function (elem) {
        elem.style.display = 'none';
    };

    hide(homePage)

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

                const cardContainer = document.getElementById('oneProduct')

                const cards = document.createElement('div');

                cards.setAttribute('class', 'flex-container-card')

                cards.innerHTML = `<div class="center">
                                    <div id=${productId} class="card-header big_id" width="300px" >
                                        <h6>${product.id}</h6>
                                        <h5>${product.codigo}</h5>
                                        <h5><i>${product.nombre}</i></h5> 
                                        <h5>${product.descripcion}</h5>
                                        <h5>Precio: ${product.precio}</h5>
                                        <h5>Stock: ${product.stock}</h5>
                                        <div class"pictures">
                                            <img src='${product.foto}'
                                        <div>     
                                    </div>`

                cardContainer.appendChild(cards);
            }
        })
        .catch(err => console.log(err))
}

export default renderProducts;
