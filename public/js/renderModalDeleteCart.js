//import deleteACart from './deleteACart.js';
import deleteACart from './deleteACartRightNow.js'
const renderModalDeleteCart = () => {

    let cartId = 0;

    document.getElementById('modalForm').style.display = 'block';

    const theForm = document.getElementById('theForm');

    theForm.innerHTML = `<div class="form-group">
      <div class="form-group">
        <label for="cartId"><b>Id de Carrito a eliminar</b></label>
        <input id="theCartId" class="form-control" type="text" name="cartId" >
      </div>
      <button type="submit" id="deleteButton" class="btn btn-danger">Eliminar</button>`;

    const formDelete = document.getElementById("deleteButton");

    theCartId.addEventListener('change', function(){

        cartId = document.getElementById('theCartId').value; 
    })

    formDelete.addEventListener('click', function () {

        deleteACart(cartId);

        document.getElementById('modalForm').style.display = 'none';
    })

    let closeModal = document.getElementById('close_generic');

    closeModal.addEventListener('click', function () {
        document.getElementById('modalForm').style.display = 'none';
    })

}

export default renderModalDeleteCart;