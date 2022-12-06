import emptyACart from './emptyACart.js';

const renderModalEmptyACart = () => {

    let cartId = 0;

    document.getElementById('modalForm').style.display = 'block';

    const theForm = document.getElementById('theForm');

    theForm.innerHTML = `<div class="form-group">
        <label for="cartId"><b>Id de Carrito a vaciar</b></label>
        <input id="theCartId" class="form-control" type="text" name="cartId" >
      </div>
      <button type="submit" id="cleanButton" class="btn btn-warning">Vaciar</button>`;

    const formClean = document.getElementById("cleanButton");

    theCartId.addEventListener('change', function(){

        cartId = document.getElementById('theCartId').value; 
    })

    formClean.addEventListener('click', function () {

        emptyACart(cartId);

        document.getElementById('modalForm').style.display = 'none';
    })

    let closeModal = document.getElementById('close_generic');

    closeModal.addEventListener('click', function () {
        document.getElementById('modalForm').style.display = 'none';
    })

}

export default renderModalEmptyACart;