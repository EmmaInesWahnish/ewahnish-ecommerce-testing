import http from 'http';

let parameters = [];

process.argv.forEach((value, index)=>{
    parameters[index]=value;
})


const data = JSON.stringify({
    codigo: "BG-01-01",
    stock: 50
})

const options = {
    hostname:'localhost',
    port: 8080,
    path: `/api/productos/${parameters[2]}`,
    method: 'PUT',
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