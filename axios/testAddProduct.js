import axios from "axios"

const env = async () => {
    let result = await axios.post("http://localhost:8080/api/productos", {
        timestamp: Date.now(),
        nombre: "Maquina de Pintar",
        descripcion: "Maquina de pintar con compresor",
        codigo: "NN-00-01",
        foto: "/images/maquina-de-pintar.jpeg",
        precio: 5880,
        stock: 50
    });
    let { data, status } = result;
    console.log(data);
    console.log(status);
}

env();

