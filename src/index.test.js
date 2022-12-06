import chai from 'chai';
import chaiHttp from 'chai-http';
import config from './configurations/dotenvConfig.js';

const expect = chai.expect;

chai.use(chaiHttp);

const port = config.server.PORT;

let item;

const url = `http://localhost:${port}`

describe('Obtencion de productos: ', () => {
    it('Debe retornar el arreglo de productos', (done) => {
        chai.request(url)
            .get('/api/productos')
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Agregado de un producto: ', () => {
    it('Debe ingresarse un producto', (done) => {
        chai.request(url)
            .post('/api/productos')
            .send({
                timestamp: Date.now(),
                nombre: "Baliza rotativa",
                descripcion: "Baliza rotativa giratoria imantada 12v",
                codigo: "BG-00-01",
                foto: "/images/baliza-giratoria.jpeg",
                precio: 4500,
                stock: 50
            })
            .end(function (err, res) {
                console.log(res.body)
                item = res.body.theProductId
                console.log(item)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Obtencion de un producto por id', () => {
    it('Debe obtener el producto incorporado', (done) => {
        chai.request(url)
            .get(`/api/productos/${item}`)
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Modificacion de un producto por id ', () => {
    it('Debe modificar el producto incorporado', (done) => {
        chai.request(url)
            .put(`/api/productos/${item}`)
            .send({
                precio: 6800,
            })
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});


describe('Eliminacion de un producto', () => {
    it('Debe eliminar el producto incorporado', (done) => {
        chai.request(url)
            .del(`/api/productos/${item}`)
            .end(function (err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
});


