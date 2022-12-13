import renderLoginForm from './renderLoginForm.js';
import sendRegisterEmail from './sendRegisterEmail.js';
import { LocalStorageService } from "./localStorageService.js";
import passwordMatch from './passwordMatch.js';

const renderregisterForm = async () => {

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
    document.getElementById('the-avatar').innerHTML = "";
    document.getElementById('orderButtons').innerHTML = "";

    const homePage = document.getElementById("homePage")

    let show = function (elem) {
        elem.style.display = 'block';
    };

    let hide = function (elem) {
        elem.style.display = 'none';
    };

    let picture = 'picture';


    hide(homePage)

    const registerUser = document.getElementById('register');
    const registerForm = document.createElement('div');
    registerForm.setAttribute('class', 'jumbotron');
    registerForm.innerHTML = `<h1 style="color:darkblue;">Registro</h1>
    <br>
    <form id="registerForm" >

    <div class="form-group">
        <label for="email"><b>Email</b></label>
        <input id="email" class="form-control" type="email" name="email">
    </div>
    <div id="check">
    <div class="form-group">
        <label for="password"><b>Password</b></label>
        <input id="password" class="form-control" type="password" name="password">
    </div>
    <div class="form-group">
        <label for="password2"><b>Reingresar Password</b></label>
        <input id="password2" class="form-control" type="password" name="password2">
    </div>
    </div>
    <div class="form-group">
        <label for="name"><b>Nombre</b></label>
        <input id="name" class="form-control" type="text" name="name">
    </div>

    <div class="form-group">
        <label for="phone"><b>Telefono</b></label>
        <input id="phone" class="form-control" type="text" name="phone">
    </div>

    <div class="form-group">
        <label for="age"><b>Edad</b></label>
        <input id="age" class="form-control" type="number" name="age">
    </div>

    <button type="submit" class="btn btn-success mt-3 mb-5">Submit</button>
</form>

</div>`

    registerUser.appendChild(registerForm);

    const form = document.getElementById('registerForm');

    let password = document.getElementById("password");

    let password2 = document.getElementById("password2")

    let validated = false;

    password.addEventListener('change', function () {
        let password = document.getElementById("password").value;
        let password2 = document.getElementById("password2").value;
        validated = passwordMatch(password, password2);
    })

    password2.addEventListener('change', function () {
        let password = document.getElementById("password").value;
        let password2 = document.getElementById("password2").value;
        validated = passwordMatch(password, password2);
    })

    form.addEventListener('submit', evt => {
        evt.preventDefault();
        if(validated){
        let data = new FormData(form);
        let obj = {};
        data.forEach((value, key) => obj[key] = value);

        const registerRoute = '/api/sessions/register'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        };

        fetch(registerRoute, requestOptions)
            .then(result => result.json())
            .then(json => console.log(json))
            .finally(async () => {
                let newUser = {
                    isNew: true,
                    user_email: obj.email,
                    needAvatar: true
                }
                LocalStorageService.setItem("newUser", newUser)
                await sendRegisterEmail(obj);
                renderLoginForm();
            })
            .catch(err => console.log(err));
        }
        else {
            alert("Las claves no coinciden")
        }
    })

}

export default renderregisterForm;