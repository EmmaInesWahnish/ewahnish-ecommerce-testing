import http from 'http';

let parameters = [];

process.argv.forEach((value, index)=>{
    parameters[index]=value;
})


const options = {
    host:'localhost',
    port: 8080,
    path: `/api/productos/${parameters[2]}`,
    method: 'GET',
    withCredentials: true
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

req.end();