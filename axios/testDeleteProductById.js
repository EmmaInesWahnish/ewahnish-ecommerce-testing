import axios from "axios"

let parameters = [];

process.argv.forEach((value, index)=>{
    parameters[index]=value;
})

const env = async () => {
    let result = await axios.delete(`http://localhost:8080/api/productos/${parameters[2]}`,{ withCredentials: true });
    console.log(result.status);
    console.log(result.data)
}

env();