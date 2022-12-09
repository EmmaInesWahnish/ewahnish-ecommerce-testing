const sendRegisterEmail = async (obj) => {

    const emailRoute = '/register_email';

    const requestOptionsMail = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
    };

    fetch(emailRoute, requestOptionsMail)
        .then(async res => {
            await res.json();
        })
    
}

export default sendRegisterEmail;