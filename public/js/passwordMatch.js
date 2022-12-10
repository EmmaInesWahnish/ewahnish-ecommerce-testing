const passwordMatch = (password, password2)=> {

    console.log("Uno ",password,"Dos ", password2)

    if (password === password2) {
        return true;
    }
    else {
        return false;
    }
} 

export default passwordMatch