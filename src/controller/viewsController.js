import sendMail from '../services/sendEmail.js';
import sendMailGmail from '../services/sendEmailGmail.js';
import usersService from '../Models/Users.js';
import { __dirname } from '../utils.js';

export const viewsRegister = (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    else {
        res.json({
            message: 'register',
        });
    };
}

export const viewsLogin = (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    else {
        res.json({
            message: 'Log',
        });
    };
}

export const viewsEmail = async (req, res) => {
    const myInfo = req.body;
    const destEmail = req.session.user.email;
    const deliveryAddress = myInfo.delivery_address;
    const first_name = myInfo.first_name;
    const last_name = myInfo.last_name;
    const productos = myInfo.order[0].productos;
    const orderNumber = myInfo.order[0].id;
    const attachment = {
        path: process.cwd() + '/public/images/GPSC.png'
    }

    let myHTML = '';

    myHTML = `<h3>
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
      class="bi bi-wrench-adjustable-circle-fill" viewBox="0 0 16 16">
      <path
        d="M6.705 8.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
      <path
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm-6.202-4.751 1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2a7.031 7.031 0 0 1-2.949-2.951ZM12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
    </svg> Todo en Herramientas - Ferretería Industrial</h3>
  <div>
    <strong>Orden de compra Nro ${orderNumber} a nombre de ${first_name} ${last_name}</strong>
    </div>
    <br>`

    myHTML = myHTML + `<strong>Lista de Productos solicitados</strong>
    <br>
    <hr>`;


    let importeTotal = 0

    for (let product of productos) {

        let importe = Number(product.cantidad * product.precio);

        importeTotal = importeTotal + importe;

        myHTML = myHTML + `<div>
        ${product.descripcion}
        <ul>
            <li>Precio unitario: $ ${product.precio}</li>
            <li>Cantidad pedida: ${product.cantidad}</li>
            <li>Importe        : $ ${importe}</li>
        </ul>
        </div>
        <hr>`
    }

    myHTML = myHTML + `<strong>Importe de la compra ${importeTotal}</strong>
    <hr>
    
    <strong>Sus productos serán entregados en la dirección informada: ${deliveryAddress}</strong>`

    try {
        let delivery_address = {
            delivery_address: deliveryAddress
        }

        await usersService.findOneAndUpdate({_id:req.session.user.id}, delivery_address, {returnOriginal: false})
    }
    catch (error) {
        res.json({
            message: 'No se ha podido ingresar la direccion',
            error: error
        })

    }

    await sendMailGmail(destEmail, myHTML, `Orden de Compra Nro ${orderNumber}`, attachment)
}

export const viewsInfo = (req, res) => {
    res.json({
        status: 'information',
        user: req.session.user
    });
}
