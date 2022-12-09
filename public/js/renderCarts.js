import renderHome from './renderHome.js';
import generateOneOrder from './generateOneOrder.js'
import renderProducts from './renderProducts.js';
import build_header from './getHeader.js';

let headers_object = build_header();

const requestOptionsGet = {
    method: 'GET',
    headers: headers_object
}

const renderCarts = (cartNumber) => {
    document.getElementById('activeCart').innerHTML = "";
    document.getElementById('cartNumber').innerHTML = "";
    document.getElementById('productCards').innerHTML = "";
    document.getElementById('newProduct').innerHTML = "";
    document.getElementById('oneProduct').innerHTML = "";
    document.getElementById('myCart').innerText = "";
    document.getElementById('productsInCart').innerHTML = "";
    document.getElementById('root').innerHTML = "";
    document.getElementById('orderButtons').innerHTML = "";

    const buttonGenerateOrder = 'generateOrder';

    const buttonClose = 'closeOrder'

    let cart = {};

    let cartOwner;

    let user_cart = ''

    let productos = [];

    const homePage = document.getElementById("homePage")

    let show = function (elem) {
        elem.style.display = 'block';
    };
    let hide = function (elem) {
        elem.style.display = 'none';
    };

    hide(homePage)

    const cartRoute = `/api/carrito/${cartNumber}`

    fetch(cartRoute, requestOptionsGet)
        .then(res => res.json())
        .then(data => {
            if (data.message === "carrito no encontrado") {
                alert("Carrito no encontrado");
                renderHome();
            } else {
                const myCart = document.getElementById('myCart')

                const carrito = data.carrito;


                const whichDb = data.whichDb;

                switch (whichDb) {
                    case 'MONGODB':
                        cartOwner = data.carrito[0].user_id;
                        user_cart = data.carrito[0].id;
                        productos = carrito[0].productos;
                        break;
                    case 'FIREBASE':
                        productos = carrito.productos;
                        user_cart = carrito.id;
                        cartOwner = carrito.user_id;
                        break;
                    case 'MARIADB':
                        productos = JSON.parse(carrito[0].productos);
                        user_cart = data.carrito[0].id;
                        productos = carrito[0].productos;
                        break;
                    case 'SQL':
                        productos = JSON.parse(carrito[0].productos);
                        user_cart = data.carrito[0].id;
                        productos = carrito[0].productos;
                        break;
                    default:
                        user_cart = carrito.id;
                        cartOwner = carrito.user_id;
                        productos = carrito.productos;
                        break;
                }

                myCart.innerText = `Carrito Nro. ${cartNumber}`;

                const cartContainer = document.getElementById('productsInCart')

                const tableHead = document.createElement('tr');

                tableHead.innerHTML = `<th>
                                            <p> 
                                                Id 
                                            </p>
                                        </th>   
                                        <th>
                                            <p> 
                                                Nombre
                                            </p>
                                        </th>
                                        <th>
                                            <p> 
                                                Descripcion
                                            </p>
                                        </th>
                                        <th>
                                            <p> 
                                                Codigo
                                            </p>
                                        </th>    
                                        <th>
                                            <p> 
                                                Foto
                                            </p>
                                        </th>    
                                        <th>
                                            <p> 
                                                Precio
                                            </p>
                                        </th>    
                                        <th>
                                            <p> 
                                                Pedido
                                            </p>
                                        </th>`

                cartContainer.appendChild(tableHead)

                for (let product of productos) {
                    const tableBody = document.createElement('tr')

                    let productId = product.id

                    const productRoute = `/api/productos/${productId}`
                    let uproduct = {}
                    fetch(productRoute, requestOptionsGet)
                        .then(res => res.json())
                        .then(data => {
                            if (data.message === "Producto no encontrado") {
                                alert("Producto no encontrado");
                                renderHome();
                            } else {
                                uproduct = data.product
                                if (uproduct.id === undefined) {
                                    uproduct = data.product[0]
                                }
                                product.precio = uproduct.precio;
                                tableBody.innerHTML = `<td>
                                            <p> 
                                                ${product.id} 
                                            </p>
                                        </td>
                                        <td>
                                            <p> 
                                                ${product.nombre}
                                            </p>
                                        </td>
                                        <td>
                                            <p> 
                                                ${product.descripcion}
                                            </p>
                                        </td>
                                        <td>
                                            <p> 
                                                ${product.codigo}
                                            </p>
                                        </td>    
                                        <td>
                                            <img src='${product.foto}'>
                                        </td>    
                                        <td>
                                            <p> 
                                                ${product.precio}
                                            </p>
                                        </td>    
                                        <td>
                                            <p> 
                                                ${product.cantidad}
                                            </p>
                                        </th>`

                                cartContainer.appendChild(tableBody)

                            }
                        })
                        .catch(err => console.log(err))
                }

                cart = {
                    timestamp: Date.now(),
                    user_id: cartOwner,
                    productos: productos,
                    user_cart: cartNumber
                }

                console.log("This is how cart remains >>> ", cart)
                const cartFooter = document.createElement('div')

                cartFooter.innerHTML = `<div class="form-group">
                    <button type="submit" id=${buttonGenerateOrder} class="btn btn-success">Comprar</button>
                    <button id=${buttonClose} class="btn btn-secondary">Continuar</button>
                </div>`

                orderButtons.appendChild(cartFooter)

                let generateOrder = document.getElementById(buttonGenerateOrder);

                let formSend = document.getElementById(buttonClose)

                generateOrder.addEventListener('click', function () {
                    generateOneOrder(cart)
                })

                formSend.addEventListener('click', function () {
                    orderButtons.innerHTML = '';
                    renderProducts()
                })

            }
        })
        .catch(err => console.log(err))

}

export default renderCarts;
