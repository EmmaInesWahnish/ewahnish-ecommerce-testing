const subtractFromQuantity = (quantity, product) => {

    if ((quantity - 1) < 0){
        alert(`No quedan ya productos en el carrito`);
    } else {
        quantity--;
    }

    const quantityId = `Q${product.id}`;

    document.getElementById(quantityId).innerText = quantity;

    return quantity
}

export default subtractFromQuantity;