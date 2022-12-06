const {knex} = require('../configurations/mariaDB.cjs');
const {knexSqLite} = require('../configurations/mySqlite3.cjs');




const createTable = async (knexSqlite) => {
  await knexSqlite.schema.createTable('carrito', table =>{
    table.increments('id').primary();
    table.timestamp('timestamp').defaultTo(knex.fn.now());
    table.json('productos').nullable();
  });
  console.log('Tabla carrito creada')
}

//createTable(knex);
createTable(knexSqLite);