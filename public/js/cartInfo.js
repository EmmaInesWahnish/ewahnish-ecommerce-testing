import build_header from './getHeader.js';

const cartInfo = (cartNumber, isAdmin) => {

    let headers_object = build_header();

    const requestOptions = {
        method: 'GET',
        headers: headers_object
    }

    if (isAdmin === 'true') {
        return
    }
    else {
        const productRoute = `/api/carrito/${cartNumber}`

        let idProducts = [];

        let cartProducts = [];

        fetch(productRoute, requestOptions)
            .then(res => res.json())
            .then(data => {
                if (data.message === "carrito no encontrado") {
                    alert("El Carrito no encontrado");
                } else {
                    const myCart = document.getElementById('myCart')

                    const carrito = data.carrito;

                    const whichDb = data.whichDb;

                    switch (whichDb) {
                        case 'MONGODB':
                            cartProducts = carrito[0].productos;
                            break;
                        case 'FIREBASE':
                            cartProducts = carrito.productos;
                            break;
                        case 'MARIADB':
                            cartProducts = JSON.parse(carrito[0].productos);
                            break;
                        case 'SQL':
                            cartProducts = JSON.parse(carrito[0].productos);
                            break;
                        default:
                            cartProducts = carrito.productos;
                            break;
                    }

                    for (let product of cartProducts) {
                        let theProduct = {
                            id: product.id,
                            cantidad: product.cantidad
                        }
                        idProducts.push(theProduct)
                    }
                    localStorage.removeItem("cart")
                    localStorage.setItem("cart", JSON.stringify(idProducts))
                }
            })
            .finally()
            .catch(err => console.log(err))
    }
}

export default cartInfo;
