const {knex} = require('../configurations/mariaDB.cjs');
const {knexSqLite} = require('../configurations/mySqlite3.cjs');

const createTable = async (knexSqlite) => {
  await knexSqlite.schema.createTable('messages', table =>{
    table.increments('id').primary();
    table.string('sender');
    table.string('socketid');
    table.string('text');
    table.string('timehh')
  });
  console.log('Tabla messages creada')
}

//createTable(knex);
createTable(knexSqLite);