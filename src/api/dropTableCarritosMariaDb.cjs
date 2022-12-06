const {knex} = require('../configurations/mariaDB.cjs');
const {knexSqLite} = require('../configurations/mySqlite3.cjs');

const dropTable = async (knex) => {
    await knex.schema.dropTable('carrito');
  console.log('Tabla carrito eliminada')
}

//createTable(knex);
dropTable(knex);