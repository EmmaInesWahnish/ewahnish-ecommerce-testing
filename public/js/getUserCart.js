const getUserCart = async (allCarts) => {

    let whichUser = localStorage.getItem("whichUser");
    
    let cart_number = 0;

    if ((allCarts !== undefined) && (allCarts.length > 0)) {

        for (let cart of allCarts) {

            let userId = '';

            console.log("User id  >>>>> ",cart.user_id)

            if (cart.user_id !== undefined) {
                userId = cart.user_id;
            }

            if (userId === whichUser) {
                cart_number = cart.id;
            }
        }
    }

    localStorage.setItem("ls_cart",cart_number)

    return cart_number;
}

export default getUserCart