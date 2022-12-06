import http from 'http';

const data = JSON.stringify({
    timestamp: Date.now(),
    nombre: "Baliza rotativa",
    descripcion: "Baliza rotativa giratoria imantada 12v",
    codigo: "BG-00-01",
    foto: "/images/baliza-giratoria.jpeg",
    precio: 1390,
    stock: 50
})

const options = {
    hostname:'localhost',
    port: 8080,
    path: '/api/productos',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-length': data.length
    }
}

const req = http.request(options, res =>{
    console.log(`status: ${res.statusCode}`)
    res.on('data', d =>{
        process.stdout.write(d);
    })
})

req.on('error', error =>{
    console.log(error)
})

req.write(data);

req.end();