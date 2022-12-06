import CartsDaoFile from './carts/CartsDaoFile.js'
import CartsDaoFirebase from './carts/CartsDaoFirebase.js'
import CartsDaoMongoDb from './carts/CartsDaoMongoDb.js'
import CartsDaoMariaDb from './carts/CartsDaoMariaDb.js'
import CartsDaoSql from './carts/CartsDaoSql.js'
import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE'

let Cart

switch (db) {
    case 'FIREBASE':
        Cart = new CartsDaoFirebase()
        break
    case 'MONGODB':
        Cart = new CartsDaoMongoDb()
        break
    case 'MARIADB':
        Cart = new CartsDaoMariaDb()
        break
    case 'SQL':
        Cart = new CartsDaoSql()
        break
    default:
        Cart = new CartsDaoFile()
        break
}

export { Cart }