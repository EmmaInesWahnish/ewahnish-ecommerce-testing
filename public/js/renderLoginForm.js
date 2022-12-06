import renderRegisterForm from './renderRegisterForm.js';
import renderHome from './renderHome.js';
import createEmptyCart from './createEmptyCart.js';
import getAllCarts from './getAllCarts.js';
import { LocalStorageService } from './localStorageService.js';
import renderModalUploadFile from './renderModalUploadFile.js';

const renderLoginForm = () => {

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

    hide(homePage)

    const loginUser = document.getElementById('login');
    const loginForm = document.createElement('div');
    loginForm.setAttribute('class', 'jumbotron');
    loginForm.innerHTML = `<h1 style="color:darkblue;">Log In</h1>
    <br>

    <form id="loginForm">

        <div class="form-group">
            <label for="email"><b>Email</b></label>
            <input id="lemail" class="form-control" type="email" name="email">
        </div>

        <div class="form-group">
            <label for="password"><b>Password</b></label>
            <input id="password" class="form-control" type="password" name="password">
        </div>

        <button type="submit" class="btn btn-success mt-3 mb-5">Submit</button>

    </form>

</div>`

    loginUser.appendChild(loginForm);

    const form = document.getElementById('loginForm');

    let theStatus = "";

    let isAdmin = 'true';

    let whichUser = '';

    let cart_number = '0';

    let newUser = LocalStorageService.getItem("newUser");

    form.addEventListener('submit', evt => {
        evt.preventDefault();
        let data = new FormData(form);
        let obj = {};
        data.forEach((value, key) => obj[key] = value);
        const loginRoute = '/api/sessions/login'

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj),
        };

        fetch(loginRoute, requestOptions)
            .then(result => result.json())
            .then(json => theStatus = json)
            .finally(() => {
                if (theStatus.status === 'success') {
                    LocalStorageService.setItem("token", theStatus.data)
                    whichUser = theStatus.payload.id;
                    localStorage.setItem("whichUser", whichUser);
                    isAdmin = theStatus.payload.isAdmin
                    localStorage.setItem("isAdmin", isAdmin)
                    isAdmin = localStorage.getItem("isAdmin")
                    if ((newUser.isNew != null) && (newUser.isNew)) {
                        try {
                            createEmptyCart(whichUser);
                        }
                        catch (error) {
                            console.log('No se pudo crear el carrito')
                        }
                    }
                    cart_number = getAllCarts(whichUser);
                    if ((newUser.isNew != null) && (newUser.needAvatar === true)) {
                        let newUser = {
                            isNew: false,
                            user_email: " ",
                            needAvatar: "recover"
                        }
                        LocalStorageService.setItem("newUser", newUser);
                        try{
                            renderModalUploadFile('picture');
                        }
                        catch (error) {
                            console.log('No se pudo crear el carrito')
                        }
                    }
                    else {
                        renderHome();
                    }
                }
                else {
                    renderRegisterForm();
                }
            })
            .catch(err => console.log(err))

    })

}

export default renderLoginForm;