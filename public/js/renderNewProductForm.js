import addOneProduct from './addOneProduct.js';
import renderHome from './renderHome.js';
import renderModalUploadFile from './renderModalUploadFile.js';

let product = {};
const renderNewProductForm = async () => {
  let picture = 'picture';
  document.getElementById('activeCart').innerHTML = "";
  document.getElementById('cartNumber').innerHTML = "";
  document.getElementById('productCards').innerHTML = "";
  document.getElementById('newProduct').innerHTML = "";
  document.getElementById('oneProduct').innerHTML = "";
  document.getElementById('myCart').innerText = "";
  document.getElementById('productsInCart').innerHTML = "";
  document.getElementById('login').innerHTML = "";
  document.getElementById('register').innerHTML = "";
  document.getElementById('logout').innerHTML = "";
  document.getElementById('root').innerHTML = "";
  document.getElementById('orderButtons').innerHTML = "";

  const homePage = document.getElementById("homePage")

  let show = function (elem) {
    elem.style.display = 'block';
  };
  let hide = function (elem) {
    elem.style.display = 'none';
  };

  hide(homePage)

  let isAdmin = localStorage.getItem("isAdmin")


  if (isAdmin === 'true') {

    const newProduct = document.getElementById('newProduct');
    const productForm = document.createElement('div');
    productForm.setAttribute('class', 'jumbotron');
    productForm.innerHTML = `<h2>Alta de producto</h2>
    <br>
    <form id="productForm" action="javascript:void(0);" id="addProductForm">

      <div class="form-group">
        <label for="nombre"><b>Nombre</b></label>
        <input id="nomb" class="form-control" type="text" name="nombre" value="">
      </div>

      <div class="form-group">
        <label for="descripcion"><b>Descripcion</b></label>
        <input id="desc" class="form-control" type="text" name="descripcion" value="">
      </div>

      <div class="form-group">
        <label for="codigo"><b>Codigo</b></label>
        <input id="code" class="form-control" type="text" name="codigo" value="">
      </div>

      <div class="form-group">
        <label for="foto"><b>Foto (url)</b></label>
        <input id="photo" class="form-control" type="text" name="foto" value="">
      </div>

      <div class="form-group">
        <label for="precio"><b>Precio</b></label>
        <input id="price" class="form-control" type="number" min=300 name="precio" value="">
      </div>

      <div class="form-group">
        <label for="stock"><b>Stock</b></label>
        <input id="quantity" class="form-control" type="text" min=1 name="stock" value="">
      </div>

      <button type="submit" class="btn btn-success" id="addProductButton">Enviar</button>
    </form>`

    newProduct.appendChild(productForm);

    let nomb = document.getElementById("nomb");
    let desc = document.getElementById("desc");
    let code = document.getElementById("code");
    let photo = document.getElementById("photo");
    let price = document.getElementById("price");
    let quantity = document.getElementById("quantity");
    let validated = true;

    let bt = document.getElementById("addProductButton")

    nomb.addEventListener('change', function () {
      product.nombre = document.getElementById("nomb").value;
    })
    desc.addEventListener('change', function () {
      product.descripcion = document.getElementById("desc").value;
    })
    code.addEventListener('change', function () {
      product.codigo = document.getElementById("code").value;
    })
    photo.addEventListener('change', function () {
      product.foto = document.getElementById("photo").value;
    })
    price.addEventListener('change', function () {
      let ok = isValid(document.getElementById("price").value, 300)
      product.precio = document.getElementById("price").value;
      if (ok) {
        validated = true;
        bt.disabled = false;
        product.precio = document.getElementById("price").value;
      } else {
        validated = false;
        bt.disabled = true;
      }
    })
    quantity.addEventListener('change', function () {
      let ok = isValid(document.getElementById("quantity").value, 0)
      if (ok) {
        validated = true;
        bt.disabled = false
        product.stock = document.getElementById("quantity").value;
      }
      else {
        validated = false;
        bt.disabled = true;
      }
    })

    const isValid = (amount, limit) => {
      if (amount > limit) {
        return true
      }
      else {
        return false
      }

    }

    let formAdd = document.getElementById("addProductButton");

    formAdd.addEventListener('click', async function () {
      if (!validated) {
        alert("valores invalidos")
      }
      else {
        let addedProduct = {
          nombre: product.nombre,
          descripcion: product.descripcion,
          codigo: product.codigo,
          foto: product.foto,
          precio: product.precio,
          stock: product.stock,
        }
        await addOneProduct(addedProduct);
        await renderModalUploadFile(picture);
      }
    })

  } else {
    alert("Para poder dar dar de alta productos, debe ingresar con perfil de administrador")
    renderHome()
  }

}

export default renderNewProductForm;