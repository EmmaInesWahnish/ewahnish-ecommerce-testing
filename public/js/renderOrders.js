import renderHome from './renderHome.js';
import emptyACart from './emptyACart.js';
import modifyOneProduct from './modifyOneProduct.js';
import ModifiedProduct from '../Classes/ModifiedProduct.js';
import build_header from './getHeader.js';
import renderProducts from './renderProducts.js';

let headers_object = build_header();

const requestOptionsGet = {
    method: 'GET',
    headers: headers_object
}

const renderOrders = (orderNumber, user_cart) => {
    document.getElementById('activeCart').innerHTML = "";
    document.getElementById('cartNumber').innerHTML = "";
    document.getElementById('productCards').innerHTML = "";
    document.getElementById('newProduct').innerHTML = "";
    document.getElementById('oneProduct').innerHTML = "";
    document.getElementById('myOrder').innerText = "";
    document.getElementById('productsInCart').innerHTML = "";
    document.getElementById('root').innerHTML = "";
    document.getElementById('orderButtons').innerHTML = "";

    const homePage = document.getElementById("homePage")

    let show = function (elem) {
        elem.style.display = 'block';
    };
    let hide = function (elem) {
        elem.style.display = 'none';
    };

    let name = '';

    let phone = '';

    let theAddress = document.getElementById('theAddress').value;

    let order = {};

    hide(homePage)

    const orderRoute = `/api/ordenes/${orderNumber}`

    fetch(orderRoute, requestOptionsGet)
        .then(res => res.json())
        .then(data => {
            if (data.message === "orden no encontrada") {
                alert("Orden no encontrada");
                renderHome();
            } else {
                order = data.order;

                const whichDb = data.whichDb;

                name = data.user_name;
                phone = data.user_phone;

                let productos = []

                switch (whichDb) {
                    case 'MONGODB':
                        productos = order[0].productos;
                        break;
                    case 'FIREBASE':
                        productos = order.productos;
                        break;
                    case 'MARIADB':
                        productos = JSON.parse(order[0].productos);
                        break;
                    case 'SQL':
                        productos = JSON.parse(order[0].productos);
                        break;
                    default:
                        productos = order.productos;
                        break;
                }

                let productsInOrder = document.getElementById('productsInOrder');

                let myOrder = document.getElementById('myOrder')

                myOrder.innerHTML = `Orden Nro. ${orderNumber}`;

                const cliente = document.getElementById('cliente');

                cliente.innerHTML = `A nombre de ${name}`;

                const tableHead = document.createElement('thead');

                tableHead.classList.add('table-responsive', 'table-dark')

                tableHead.innerHTML = `<tr>
                                        <th>
                                            <p> 
                                                Nombre
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
                                        </th>    
                                        <th>
                                            <p> 
                                                Importe
                                            </p>
                                        </th>
                                    </tr>`

                productsInOrder.appendChild(tableHead);

                let total = 0
                for (let product of productos) {
                    let importe = Number(product.precio) * Number(product.cantidad);

                    let stock = Number(product.stock) - Number(product.cantidad)
                    total = total + importe;
                    const tableBody = document.createElement('tr')

                    tableBody.innerHTML = `<tr>
                                        <td>
                                            <p> 
                                                ${product.nombre}
                                            </p>
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
                                        </td>    
                                        <td>
                                            <p> 
                                                ${importe}
                                            </p>
                                        </td>`

                    productsInOrder.appendChild(tableBody)

                    const modifiedProduct = new ModifiedProduct();
                    modifiedProduct.id = product.id;
                    modifiedProduct.timestamp = product.timestamp;
                    modifiedProduct.nombre = product.nombre;
                    modifiedProduct.descripcion = product.descripcion;
                    modifiedProduct.codigo = product.codigo;
                    modifiedProduct.foto = product.foto;
                    modifiedProduct.precio = product.precio;
                    modifiedProduct.stock = stock;

                    modifyOneProduct(modifiedProduct)
                }

                let orderTotal = document.getElementById('orderTotal');

                orderTotal.innerText = `Importe total ${total}`;
            }
        })
        .catch(err => console.log(err))

    const formSend = document.getElementById('formSend');

    formSend.addEventListener('click', function () {

        emptyACart(user_cart);

        let myOrder = {
            delivery_address: theAddress,
            name: name,
            phone: phone,
            order: order
        };

        const emailRoute = '/email';

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(myOrder),
        };

        fetch(emailRoute, requestOptions)
            .then(async res => {
                await res.json();
            })
        renderProducts();            
        document.getElementById('modalForm').style.display = 'none';

    })

}

export default renderOrders;
