import AnyContainer from '../api/Container.js';
const products = [
    {
        timestamp: Date.now(),
        nombre: "Pistola de Calor",
        descripcion: "Pistola de calor Black & Decker",
        codigo: "BD-00-01",
        foto: "/images/pistola-de-calor.jpeg",
        precio: 4670,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Maquina de Pintar",
        descripcion: "Maquina de pintar con compresor",
        codigo: "NN-00-01",
        foto: "/images/maquina-de-pintar.jpeg",
        precio: 5880,
        stock: 50
    },
    {
        timestamp: Date.now(),
        nombre: "Llaves combinadas",
        descripcion: "Llaves combinadas acodadas",
        codigo: "LC-00-01",
        foto: "/images/llaves-combinadas.jpeg",
        precio: 10120,
        stock: 30
    },
    {
        timestamp: Date.now(),
        nombre: "Set de Destornilladores",
        descripcion: "Set de destornilladores Bahco",
        codigo: "BA-00-01",
        foto: "/images/set-destornilladores.jpeg",
        precio: 3570,
        stock: 150
    },
    {
        timestamp: Date.now(),
        nombre: "Caja de herramientas",
        descripcion: "Caja de herramientas Carro 47 x 27",
        codigo: "CH-00-01",
        foto: "/images/caja-herramientas-carro.jpeg",
        precio: 4670,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Taladro de banco",
        descripcion: "Taladro de banco agujereadora Luqstoff",
        codigo: "TB-00-01",
        foto: "/images/taladro-banco.jpeg",
        precio: 4670,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Cables de bateria",
        descripcion: "Cables de bateria",
        codigo: "CB-00-01",
        foto: "/images/cable-bateria.jpeg",
        precio: 1970,
        stock: 400
    },
    {
        timestamp: Date.now(),
        nombre: "Triangulo Baliza",
        descripcion: "Triangulo baliza led portatil",
        codigo: "BA-00-01",
        foto: "/images/triangulo-baliza.jpeg",
        precio: 1100,
        stock: 200
    },
    {
        timestamp: Date.now(),
        nombre: "Baliza rotativa",
        descripcion: "Baliza rotativa giratoria imantada 12v",
        codigo: "BG-00-01",
        foto: "/images/baliza-giratoria.jpeg",
        precio: 1390,
        stock: 50
    },
    {
        timestamp: Date.now(),
        nombre: "Compresor de aire 12V Metal",
        descripcion: "Compresor de aire apto para auto bici y moto",
        codigo: "CA-00-01",
        foto: "/images/compresor-aire.jpeg",
        precio: 3280,
        stock: 80
    },
    {
        timestamp: Date.now(),
        nombre: "Cargador de bateria",
        descripcion: "Cargador de bateria apto para auto moto y cuatriciclo",
        codigo: "CB-00-01",
        foto: "/images/cargador-bateria.jpeg",
        precio: 5100,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Cricket Carrito Hidraulico",
        descripcion: "Cricket carrito hidraulico 2 toneladas",
        codigo: "CC-00-01",
        foto: "/images/cricket-carrito.jpeg",
        precio: 8400,
        stock: 80
    },
    {
        timestamp: Date.now(),
        nombre: "Cricket hidraulico botella",
        descripcion: "Cricket hidraulico botella reforzado (2 toneladas)",
        codigo: "CB-00-01",
        foto: "/images/cricket-botella.jpeg",
        precio: 4670,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Bomba Centrifuga",
        descripcion: "Bomba centrifuga 1/2 Hp Fluvial",
        codigo: "BC-00-01",
        foto: "/images/bomba-centrifuga.jpeg",
        precio: 12800,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Sopladora",
        descripcion: "Sopladora Luqstoff",
        codigo: "BD-00-01",
        foto: "/images/sopladora.jpeg",
        precio: 10987,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Lijadora orbital",
        descripcion: "Lijadora orbital Silverfox",
        codigo: "LO-00-01",
        foto: "/images/lijadora-orbital.jpeg",
        precio: 3330,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Compresor de aire",
        descripcion: "Compresor de aire 24 litros 2hp",
        codigo: "CA-00-02",
        foto: "/images/compresor-24.jpeg",
        precio: 20990,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Sopladora",
        descripcion: "Sopladora Luqstoff",
        codigo: "SO-00-01",
        foto: "/images/sopladora.jpeg",
        precio: 10987,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Sierra Caladora",
        descripcion: "Sierra caladora ingleteadora biselada 420w",
        codigo: "SC-00-01",
        foto: "/images/sierra-caladora.jpeg",
        precio: 6490,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Sierra circular",
        descripcion: "Sierra circular electrica SkillSaw",
        codigo: "SC-00-02",
        foto: "/images/sierra-circular.jpeg",
        precio: 11299,
        stock: 100
    },
    {
        timestamp: Date.now(),
        nombre: "Soldadora Inverter",
        descripcion: "Soldadora Inverter Kommbera",
        codigo: "SI-00-01",
        foto: "/images/soldadora.jpeg",
        precio: 14990,
        stock: 40
    },
]

const Products = new AnyContainer('./files/productos.txt');

async function anyContainerLoader() {

    await Products.deleteLoadExpress(products)
    
}

export default anyContainerLoader;
