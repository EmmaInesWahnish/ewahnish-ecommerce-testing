const knexSqLite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './DB/ferreteria.sqlite'
    },
    useNullAsDefault: true
  })
  
  module.exports = { knexSqLite };