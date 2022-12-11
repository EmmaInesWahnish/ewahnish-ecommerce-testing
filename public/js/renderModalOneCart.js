
import renderCarts from './renderCarts.js';
import { LocalStorageService } from './localStorageService.js';
import renderHome from './renderHome.js';

const renderModalOneCart = () => {

    const isAdmin = LocalStorageService.getItem("isAdmin");


    if (isAdmin) {
        alert("Opcion destinada a que un usuario pueda visualizar su carrito")
        renderHome();
    }
    else {
        let buttonId = "showCart";

        const thisCart = document.getElementById('thisCart');

        let cartNumber = thisCart.innerText;

        document.getElementById('modalForm').style.display = 'block';

        const theForm = document.getElementById('theForm');

        theForm.innerHTML = `<div class="form-group">
      <div class="form-group">
        <label for="carttId"><b>Id de Carrito</b></label>
        <input id="theId" class="form-control" type="text" name="cartId" >
      </div>
      <button type="submit" id=${buttonId} class="btn btn-success">Aceptar</button>`;

        if (cartNumber !== '') {
            document.getElementById('theId').value = cartNumber;
        }

        let formUpdate = document.getElementById(buttonId);

        theId.addEventListener('change', function () {

            cartNumber = document.getElementById('theId').value;
        })

        formUpdate.addEventListener('click', function () {
            renderCarts(cartNumber);

            document.getElementById('modalForm').style.display = 'none'
        })

        let closeModal = document.getElementById('close_generic');

        closeModal.addEventListener('click', function () {
            document.getElementById('modalForm').style.display = 'none';
        })
    }
}

export default renderModalOneCart;