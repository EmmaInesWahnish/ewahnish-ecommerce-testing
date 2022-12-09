import build_header from './getHeader.js';
import { LocalStorageService } from './localStorageService.js'

let headers_object = build_header();

const getImage = async () => {

    const imageRoute = `/api/auxiliar`

    const requestOptions = {
        method:'GET',
        headers: headers_object,
    };

    fetch(imageRoute, requestOptions)
    .then(res => res.json())
    .then(data  => {
        console.log(data);
        LocalStorageService.setItem("image",data.response[0].auxurl);
        return data.response[0].auxurl;
    })
    .catch(error => {
        console.log('Se produjo el siguiente error: ', error);    
    })
    
}

export default getImage;
