import AnyContainer from '../api/Container.js';

const Products = new AnyContainer('./files/productos.txt');

async function anyContainerClean() {

    await Products.deleteAll()
    
}

export default anyContainerClean;
