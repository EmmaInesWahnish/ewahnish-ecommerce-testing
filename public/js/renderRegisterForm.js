import renderHome from "./renderHome.js";
import renderLoginForm from './renderLoginForm.js';
import sendRegisterEmail from './sendRegisterEmail.js';
import { LocalStorageService } from "./localStorageService.js";
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
    <div class="form-group">
        <label for="password"><b>Password</b></label>
        <input id="password" class="form-control" type="password" name="password">
    </div>

    <div class="form-group">
        <label for="first_name"><b>First Name</b></label>
        <input id="first_name" class="form-control" type="text" name="first_name">
    </div>

    <div class="form-group">
        <label for="last_name"><b>Last Name</b></label>
        <input id="last_name" class="form-control" type="text" name="last_name">
    </div>

    <div class="form-group">
        <label for="age"><b>Age</b></label>
        <input id="age" class="form-control" type="number" name="age">
    </div>

    <button type="submit" class="btn btn-success mt-3 mb-5">Submit</button>
</form>

</div>`

    registerUser.appendChild(registerForm);

    const form = document.getElementById('registerForm');

    form.addEventListener('submit', evt => {
        evt.preventDefault();

        let data = new FormData(form);
        let obj = {};
        data.forEach((value, key) => obj[key] = value);

        console.log("Object ", obj)

        const requestOptionsMail = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        };

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

    })

}

export default renderregisterForm;