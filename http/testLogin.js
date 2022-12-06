import http from 'http';

let parameters = [];

process.argv.forEach((value, index)=>{
    parameters[index]=value;
})


const data = JSON.stringify({
    email: `${parameters[2]}`,
    password: `${parameters[3]}`
})

const options = {
    hostname:'localhost',
    port: 8080,
    path: '/api/sessions/login',
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