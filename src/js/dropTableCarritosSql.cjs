const {knex} = require('../configurations/mariaDB.cjs');
const {knexSqLite} = require('../configurations/mySqlite3.cjs');

const dropTable = async (knexSqlite) => {
    await knexSqlite.schema.dropTable('carrito');
  console.log('Tabla carrito eliminada')
}

//createTable(knex);
dropTable(knexSqLite);