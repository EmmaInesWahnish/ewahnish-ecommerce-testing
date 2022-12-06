import FileContainer from '../../api/FileContainer.js';

class CartsDaoFiles extends FileContainer {

    constructor() {
        super(process.cwd() + '/DB/carrito.json')
    }

    async disconnect() {

    }
}

export default CartsDaoFiles;