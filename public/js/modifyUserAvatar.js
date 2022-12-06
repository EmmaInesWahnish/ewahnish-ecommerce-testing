import { LocalStorageService } from './localStorageService.js';
import getImage from './getImage.js';

const modifyUserAvatar = async (user_email) => {

    await getImage();

    let auxurl = LocalStorageService.getItem("image");

    let obj = {
        user_email: user_email,
        auxurl: auxurl
    }

    const avatarRoute = '/api/sessions/avatar'

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    };

    fetch(avatarRoute, requestOptions)
        .then(result => result.json())
        .then(json => theStatus = json)
        .catch(err => console.log(err))
}
export default modifyUserAvatar