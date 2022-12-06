import showOneProduct from './showOneProduct.js'

const renderModalOneProduct = () => {
    
    let buttonId = "showProduct";

    let productId = 0;

    document.getElementById('modalForm').style.display = 'block';

    const theForm = document.getElementById('theForm');

    theForm.innerHTML = `<div class="form-group">
      <div class="form-group">
        <label for="productId"><b>Id de Producto</b></label>
        <input id="theId" class="form-control" type="text" name="productId" >
      </div>
      <button type="submit" id=${buttonId} class="btn btn-success">Enviar</button>`;

    let formUpdate = document.getElementById(buttonId);

    theId.addEventListener('change', function(){

        productId = document.getElementById('theId').value;   
    })

    formUpdate.addEventListener('click', function () {

        showOneProduct(productId);

        document.getElementById('modalForm').style.display = 'none';
    })

    let closeModal = document.getElementById('close_generic');

    closeModal.addEventListener('click', function () {
        document.getElementById('modalForm').style.display = 'none';
    })

}

export default renderModalOneProduct;