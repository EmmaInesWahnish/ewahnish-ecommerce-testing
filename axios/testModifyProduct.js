import axios from "axios"

let parameters = [];

process.argv.forEach((value, index)=>{
    parameters[index]=value;
})

const env = async () => {
    let result = await axios.put(`http://localhost:8080/api/productos/${parameters[2]}`, {
        precio: 8000,
        stock: 80
    });
    let { data, status } = result;
    console.log(data);
    console.log(status);
}

env();
