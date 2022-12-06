
import renderOrders from './renderOrders.js';

const renderModalUserOrder = (orderNumber, user_cart) => {

    let buttonIdShow = "showOrder";

    let buttonIdSend = "formSend"

    document.getElementById('modalForm').style.display = 'block';

    const theForm = document.getElementById('theForm');

    theForm.innerHTML = `<div class="form-group">
                            <label for="orderId"><b>Id de Orden</b></label>
                            <input id="theOrderId" class="form-control" type="text" name="orderId" >
                        </div>
                        <div>
                            <label for="deliveryAddress"><b>Dirección de Entrega</b></label>
                            <input id="theAddress" class="form-control" type="text" name="deliveryAddress" required>
                        </div>
                        <div class="flex-container-order">
                            <button type="submit" id=${buttonIdShow} class="btn btn-small btn-success">Mostrar</button>
                            <button type="submit" id=${buttonIdSend} class="btn btn-small btn-light">Enviar</button>
                        </div>
                        <div id="orderHeader" class="container mt-3" width="100%">
                            <h4 id="cliente"></h4>
                            <h4 id="myOrder"></h4>
                        </div>
                        <div id="listOneOrder" class="container mt-3" width="100%">
                            <table id="productsInOrder" class="table table-light table-responsive table-bordered table-striped"></table>
                            <h4 id="orderTotal"></h4>
                        </div>`;

    if (orderNumber !== '') {
        document.getElementById('theOrderId').value = orderNumber;
    }

    theOrderId.addEventListener('change', function () {
        orderNumber = document.getElementById('theOrderId').value;
    })

    let formUpdate = document.getElementById(buttonIdShow);

    formUpdate.addEventListener('click', function () {
        renderOrders(orderNumber, user_cart);
    })

    let closeModal = document.getElementById('close_generic');

    closeModal.addEventListener('click', function () {
        document.getElementById('modalForm').style.display = 'none';
    })
}

export default renderModalUserOrder;