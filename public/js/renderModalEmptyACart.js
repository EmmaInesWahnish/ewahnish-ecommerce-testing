import emptyACart from './emptyACart.js';
import { LocalStorageService } from './localStorageService.js';

const renderModalEmptyACart = () => {

    const isAdmin = LocalStorageService.getItem("isAdmin")

    if (isAdmin) {
        alert("Opcion destinada a que un usuario pueda vaciar su carrito")
        renderHome();
    }
    else {

        const thisCart = document.getElementById('thisCart');

        let cartId = thisCart.innerText;


        document.getElementById('modalForm').style.display = 'block';

        const theForm = document.getElementById('theForm');

        theForm.innerHTML = `<div class="form-group">
        <label for="cartId"><b>Id de Carrito a vaciar</b></label>
        <input id="theCartId" class="form-control" type="text" name="cartId" value=${cartId}>
      </div>
      <button type="submit" id="cleanButton" class="btn btn-warning">Vaciar</button>`;

        const formClean = document.getElementById("cleanButton");

        theCartId.addEventListener('change', function () {

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
}

export default renderModalEmptyACart;