import http from 'http';

const options = {
    host:'localhost',
    port: 8080,
    path: '/',
    method: 'GET'
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