import axios from "axios"

let parameters = [];

process.argv.forEach((value, index)=>{
    parameters[index]=value;
})

const env = async () => {
    let reslogin = await axios.post ("http://localhost:8080/api/sessions/login",{
        email: `${parameters[2]}`,
        password:  `${parameters[3]}`
    });
    let {data, status } = reslogin;
    console.log(data);
    console.log(status);
}

env();

