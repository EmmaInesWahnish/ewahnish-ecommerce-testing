import axios from "axios"

const env = async () => {
    let result = await axios.get("http://localhost:8080/api/productos",{ withCredentials: true });
    console.log(result.status);
    console.log(result.data)
}

env();