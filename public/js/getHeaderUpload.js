import { LocalStorageService } from "./localStorageService.js";

const build_header = ()=>{

    let auth_token =LocalStorageService.getItem("token");

    const headers_object = {
        'Accept':'application/json',
        'Authorization': 'Bearer '+ auth_token
    }

    return headers_object;

}

export default build_header