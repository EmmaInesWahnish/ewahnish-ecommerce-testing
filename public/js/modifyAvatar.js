import { LocalStorageService } from './localStorageService.js';
import getImage from './getImage.js';
import build_header from './getHeader.js';

let headers_object = build_header();

const modifyAvatar = async (user_email) => {

    let obj = {};

    const avatarRoute = '/api/sessions/avatar'

    const imageRoute = `/api/auxiliar`

    const requestOptions = {
        method: 'GET',
        headers: headers_object,
    };

    fetch(imageRoute, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            LocalStorageService.setItem("image", data.response[0].auxurl);
            let auxurl = data.response[0].auxurl;
            obj = {
                user_email: user_email,
                auxurl: auxurl
            }
            const requestOptionsUser = {
                method: 'POST',
                headers: headers_object,
                body: JSON.stringify(obj),
            };

            fetch(avatarRoute, requestOptionsUser)
                .then(result => result.json())
                .catch(err => console.log(err))

        })
        .catch(error => {
            console.log('Se produjo el siguiente error: ', error);
        })
}
export default modifyAvatar