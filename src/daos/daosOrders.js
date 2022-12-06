import OrdersDaoFile from './orders/OrdersDaoFile.js'
import OrdersDaoFirebase from './orders/OrdersDaoFirebase.js'
import OrdersDaoMongoDb from './orders/OrdersDaoMongoDb.js'
import OrdersDaoMariaDb from './orders/OrdersDaoMariaDb.js'
import OrdersDaoSql from './orders/OrdersDaoSql.js'
import config from '../configurations/dotenvConfig.js'

const db = config.envs.SELECTED_DB || 'FILE'

let Order

switch (db) {
    case 'FIREBASE':
        Order = new OrdersDaoFirebase()
        break
    case 'MONGODB':
        Order = new OrdersDaoMongoDb()
        break
    case 'MARIADB':
        Order = new OrdersDaoMariaDb()
        break
    case 'SQL':
        Order = new OrdersDaoSql()
        break
    default:
        Order = new OrdersDaoFile()
        break
}

export { Order }