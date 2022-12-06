import build_header from './getHeader.js';

const deleteACart = (cartId) => {

    const productRoute = `/api/carrito/${cartId}`

    let headers_object = build_header();

    const requestOptionsGet = {
        method: 'GET',
        headers: headers_object
    }

    const requestOptionsDelete = {
        method: 'DELETE',
        headers: headers_object
    }

    fetch(productRoute, requestOptionsGet)
        .then(res => res.json())
        .then(data => {
            let howMany = data.productos.length;
            if (howMany <= 0) {
                fetch(productRoute, requestOptionsDelete)
                    .then(async res => {

                        await res.json();

                    })
                    .catch(err => console.log(err))
            }
            for (let product of data.productos) {
                const productId = product.id;

                const productRouteTwo = `/api/carrito/${cartId}/productos/${productId}`

                fetch(productRouteTwo,requestOptionsDelete)
                    .then(async res => {

                        const data = await res.json();
                        fetch(productRoute, requestOptionsDelete)
                            .then(async res => {

                                await res.json();

                            })
                            .catch(err => console.log(err))


                    })
                    .catch(err => console.log(err))
            }
        })
}

export default deleteACart;
