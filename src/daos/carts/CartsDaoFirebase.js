import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const admin = require("firebase-admin");

const serviceAccount = require("../../../DB/ewahnish-backend-project-firebase-adminsdk-3zku9-582a3c27cd.json");

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

const query = db.collection('carrito');

import FirebaseContainer from '../../api/FirebaseContainer.js';

class CartsDaoFirebase extends FirebaseContainer {

    constructor() {
        super()
        this.db = db;
        this.query = query;
    }

    async disconnect() {

    }
}

export default CartsDaoFirebase;