import config from '../configurations/dotenvConfig.js'
import MongoClient from '../daos/MongoClient.js'

const db = config.envs.SELECTED_DB || 'FILE';

let persistence = {}

switch (db) {
    case 'FIREBASE':
        let { default: CartsDaoFirebase } = import('../daos/carts/CartsDaoFirebase.js')
        let { default: ProductsDaoFirebase } = import('../daos/products/ProductsDaoFirebase.js')
        let { default: OrdersDaoFirebase } = import('../daos/orders/OrdersDaoFirebase.js')
        persistence = {
            Carts: new CartsDaoFirebase(),
            Products: new ProductsDaoFirebase(),
            Orders: new OrdersDaoFirebase()
        }
        break
    case 'MONGODB':
        const connection = MongoClient.getInstance();
        let { default: CartsDaoMongoDb } = await import('../daos/carts/CartsDaoMongoDb.js')
        let { default: ProductsDaoMongoDb } = await import('../daos/products/ProductsDaoMongoDb.js')
        let { default: OrdersDaoMongoDb } = await import('../daos/orders/OrdersDaoMongoDb.js')
        persistence = {
            Carts: new CartsDaoMongoDb(),
            Products: new ProductsDaoMongoDb(),
            Orders: new OrdersDaoMongoDb()
        }
        break
    case 'MARIADB':
        let { default: CartsDaoMariaDb } = await import('../daos/carts/CartsDaoMariaDb.js')
        let { default: ProductsDaoMariaDb } = await import('../daos/products/ProductsDaoMariaDb.js')
        let { default: OrdersDaoMariaDb } = await import('../daos/orders/OrdersDaoMariaDb.js')
        persistence = {
            Carts: new CartsDaoMariaDb(),
            Products: new ProductsDaoMariaDb(),
            Orders: new OrdersDaoMariaDb()
        }
        break
    case 'SQL':
        let { default: CartsDaoSql } = await import('../daos/carts/CartsDaoSql.js')
        let { default: ProductsDaoSql } = await import('../daos/products/ProductsDaoSql.js')
        let { default: OrdersDaoSql } = await import('../daos/orders/OrdersDaoFirebase.js')
        persistence = {
            Carts: new CartsDaoSql(),
            Products: new ProductsDaoSql(),
            Orders: new OrdersDaoSql()
        }
        break
    default:
        let { default: CartsDaoFile } = await import('../daos/carts/CartsDaoFile.js')
        let { default: ProductsDaoFile } = await import('../daos/products/ProductsDaoFile.js')
        let { default: OrdersDaoFile } = await import('../daos/orders/OrdersDaoFile.js')
        persistence = {
            Carts: new CartsDaoFile(),
            Products: new ProductsDaoFile(),
            Orders: new OrdersDaoFile()
        }
        break
}

export {persistence}

