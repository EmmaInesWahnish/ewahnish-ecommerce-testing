import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const {knex} = require('../configurations/mariaDB.cjs');
const {knexSqLite} = require('../configurations/mySqlite3.cjs');

const createTable = async (knex) => {
  await knex.schema.createTable('productos', table =>{
    table.increments('id').primary()
    table.string('timestamp')
    table.string('nombre')
    table.string('descripcion')
    table.string('codigo')
    table.string('foto')
    table.decimal('precio',8,2)
    table.integer('stock')  
  });
  console.log('Tabla creada')
}

//createTable(knex);
createTable(knex);