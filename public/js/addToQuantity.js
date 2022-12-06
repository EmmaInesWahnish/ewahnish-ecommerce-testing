const addToQuantity = (quantity, product) => {

    if ((quantity + 1) > product.stock){
        alert(`No quedan productos suficientes, cantidad acumulada = ${quantity + 1} existencia en stock = ${product.stock} del producto ${product.id}`);
    } else {
        quantity++;
    }

    const quantityId = `Q${product.id}`;

    document.getElementById(quantityId).innerText = quantity;

    return quantity
}

export default addToQuantity;