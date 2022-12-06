import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { knex } = require('../../configurations/mariaDB.cjs');
const { knexSqLite } = require('../../configurations/mySqlite3.cjs');

import SqlContainer from '../../api/SqlContainer.js';

class CartsDaoSql extends SqlContainer {

    constructor() {
        super()
        this.myDbConnection = knexSqLite;
        this.myTable = 'carrito'
    }

    async disconnect() {

    }
}

export default CartsDaoSql;