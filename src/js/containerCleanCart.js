import AnyContainer from '../api/Container.js';

const Products = new AnyContainer('./DB/carrito.json');

async function anyContainerClean() {

    await Products.deleteAll()
    
}

module.exports = anyContainerClean;
