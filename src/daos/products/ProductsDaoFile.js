import FileContainer from '../../api/FileContainer.js';

class ProductsDaoFile extends FileContainer {

    constructor() {
        super(process.cwd() + '/DB/productos.json')
    }

    async disconnect() {

    }
}

export default ProductsDaoFile;