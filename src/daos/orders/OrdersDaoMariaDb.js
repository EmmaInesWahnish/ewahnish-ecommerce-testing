import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { knex } = require('../../configurations/mariaDB.cjs');
const { knexSqLite } = require('../../configurations/mySqlite3.cjs');

import MariaDbContainer from '../../api/MariaDbContainer.js';

class OrdersDaoSql extends MariaDbContainer {

    constructor() {
        super()
        this.myDbConnection = knex;
        this.myTable = 'order'
    }

    async disconnect() {

    }
}

export default OrdersDaoSql;