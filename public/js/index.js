import renderProducts from './renderProducts.js';

import renderModalOneCart from './renderModalOneCart.js';

import renderHome from './renderHome.js'

import renderNewProductForm from './renderNewProductForm.js';

import renderLoginForm from './renderLoginForm.js';

import renderModalUploadFile from './renderModalUploadFile.js';

import renderModalOneOrder from './renderModalOneOrder.js';

import renderRegisterForm from './renderRegisterForm.js'

import renderModalOneProduct from './renderModalOneProduct.js';

import renderModalDeleteCart from './renderModalDeleteCart.js';

import renderModalEmptyACart from './renderModalEmptyACart.js';

const listProducts = document.getElementById('listProducts');

const createProduct = document.getElementById('createProduct');

const newLogin = document.getElementById('login_user');

const newRegister = document.getElementById('register_user');

const logoutUser = document.getElementById('logout_user')

const productDetail = document.getElementById('productDetail');

const deleteCart = document.getElementById('deleteCart');

const upload = document.getElementById('upload')

const listCart = document.getElementById('listCart');

const emptyACart = document.getElementById('emptyACart');

const homePage = document.getElementById('home');

const order = document.getElementById('order')

const socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');
let email = document.getElementById('email');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = addMessage();
    if (input.value) {
        socket.emit('chat message', message);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {
    renderMessage(msg);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('new user', (msg) => {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('old messages', (msg) => {
    renderMessage(msg);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('new product', (msg) => {
    //console.log(msg)
    renderProduct(msg);
    window.scrollTo(0, document.body.scrollHeight);
})

function addMessage(e) {
    let today = new Date();
    let author = {
        email: document.getElementById("email").value,
        nombre: document.getElementById("name").value,
        apellido: document.getElementById("last_name").value,
        edad: document.getElementById("age").value,
        alias: document.getElementById("nickname").value,
        avatar: document.getElementById("avatar").value
    }

    let message = {
        timestamp: today,
        author: author,
        text: document.getElementById("input").value,
    };
    return message
}

function renderMessage(data) {
    let theDateTime = (data.timestamp).toString();
    const where = document.createElement('div')
    where.innerHTML = `<b>${data.author.email}</b>
                        <span id="theDate">${theDateTime}</span> 
                        <span id="name">${data.author.alias}</span> 
                        <i>${data.text}</i>
                        <img class="avatar" src="${data.author.avatar}"/>
                    <div>`;
    messages.appendChild(where);
}

listProducts.addEventListener('click', () => {
    renderProducts();
});

homePage.addEventListener('click', () => {
    renderHome();
});

createProduct.addEventListener('click', async () => {
    renderNewProductForm();
});

newLogin.addEventListener('click', () => {
    renderLoginForm();
});

newRegister.addEventListener('click', () => {
    renderRegisterForm();
});

logoutUser.addEventListener('click', () => {
    signOut();
});

productDetail.addEventListener('click', () => {
    renderModalOneProduct()
})

deleteCart.addEventListener('click', () => {
    renderModalDeleteCart()
})

upload.addEventListener('click', () => {
    let picture = 'picture'
    renderModalUploadFile(picture)
})

listCart.addEventListener('click', () => {
    renderModalOneCart(cartNumber)
})

order.addEventListener('click', () => {
    renderModalOneOrder()
})

emptyACart.addEventListener('click', () => {
    renderModalEmptyACart(cartNumber)
})

function signOut() {

    const loginRoute = '/api/sessions/logout'
    let theStatus;
    fetch(loginRoute)
        .then(result => result.json())
        .then(json => theStatus = json)
        .finally(() => {
            if (theStatus.status === 'success') {
                renderHome();
            }
        })
        .catch(err => console.log(err));
}

var simulateClick = function (elem) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
};

simulateClick(homePage)