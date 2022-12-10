import renderLoginForm from './renderLoginForm.js';
import modifyAvatar from './modifyAvatar.js';
import build_header from './getHeader.js';
import { LocalStorageService } from './localStorageService.js';
import renderProducts from './renderProducts.js';

let headers_object = build_header();

const renderHome = () => {

    let newUser = LocalStorageService.getItem("newUser");

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

    let cartId = '';

    let avatar = '';

    let user_avatar = '/uploads/generic-avatar.jpg';

    let user_message = 'Si desea personalizar su avatar puede utilizar Upload Avatar en la barra de menu'

    let show = function (elem) {
        elem.style.display = 'block';
    };
    let hide = function (elem) {
        elem.style.display = 'none';
    };
    hide(homePage)
    let session = "";

    const homeRoute = '/api/sessions';

    const requestOptions = {
        method: 'GET',
        headers: headers_object,
    };

    fetch(homeRoute, requestOptions)
        .then(result => result.json())
        .then(json => session = json)
        .finally(async () => {
            if (session.user) {
                if (session.user.avatar !== null && session.user.avatar !== "" && session.user.avatar) {
                    user_avatar = session.user.avatar;
                    document.getElementById('the-avatar').innerHTML = `<img id="user_avatar" class="avatar" src="${user_avatar}"/> ${session.user.email} Logged in`
                    user_message = '';
                }
                show(homePage)
                document.getElementById('welcome').innerHTML = `Te damos la bienvenida ${session.user.name}! 👋 <p>${user_message}</p>`;
                document.getElementById('email').value = session.user.email;
                document.getElementById('name').value = session.user.name;
                document.getElementById('phone').value = session.user.phone;
                document.getElementById('avatar').value = session.user.avatar;
                avatar = session.user.avatar;
                user_avatar = document.getElementById('user_avatar').value;
                if (newUser.isNew != null) {
                    if ((newUser.needAvatar === 'recover')) {
                        let newUser = {
                            isNew: false,
                            user_email: "cart",
                            needAvatar: false
                        }
                        LocalStorageService.setItem("newUser", newUser);
                        await modifyAvatar(session.user.email)
                    }
                }
                if (avatar == '/uploads/generic-avatar.jpg') {
                    if (session.user.isAdmin == false) {
                        let newAvatar = LocalStorageService.getItem("image");
                        console.log(newAvatar)
                        document.getElementById('the-avatar').innerHTML = `<img id="user_avatar" class="avatar" src="${newAvatar}"/> ${session.user.email} Logged in`
                    }
                    else {
                        console.log("Sale por primer else >>>> ", avatar, " ", session.user.isAdmin)
                    }
                }
                else {
                    console.log("Sale por segundo else >>>> ", avatar, " ", session.user.isAdmin)
                }
                renderProducts()

            }
            else {
                renderLoginForm();
            }
        })
        .catch(err => console.log(err))

}

export default renderHome;