import deleteOneProduct from './deleteOneProduct.js'
const renderModalDeleteProduct = (product) => {
    
    let buttonId = "DM" + product.id;

    document.getElementById('modalForm').style.display = 'block';

    const theForm = document.getElementById('theForm');

    theForm.innerHTML = `<div class="form-group">
        <span for="productId"><b>Id de Producto ${product.id}</b></span>
      </div>

      <div class="form-group">
        <label for="nombre"><b>Nombre</b></label>
        <span id="nombre" class="form-control" name="nombre">${product.nombre}</span>
      </div>

      <div class="form-group">
        <label for="descripcion"><b>Descripcion</b></label>
        <span id="descripcion" class="form-control" name="descripcion">${product.descripcion}</span>
      </div>

      <div class="form-group">
        <label for="codigo"><b>Codigo</b></label>
        <span id="codigo" class="form-control" name="codigo">${product.codigo}</span>
      </div>

      <div class="form-group">
        <label for="foto"><b>Foto (url)</b></label>
        <span id="foto" class="form-control" name="foto">${product.foto}</span>
      </div>

      <button type="submit" id=${buttonId} class="btn btn-success">Confirmar Eliminacion</button>`;

    let formDelete = document.getElementById(buttonId);

    formDelete.addEventListener('click', function () {
        deleteOneProduct(product.id);
        document.getElementById('modalForm').style.display = 'none';
    })

    let closeModal = document.getElementById('close_generic');

    closeModal.addEventListener('click', function () {
        document.getElementById('modalForm').style.display = 'none';
    })

}

export default renderModalDeleteProduct;