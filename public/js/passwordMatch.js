const passwordMatch = (password1, password2)=> {

    console.log("Uno ",password1,"Dos ", password2)

    if (password1 === password2) {
        return true;
    }
    else {
        return false;
    }
} 

export default passwordMatch