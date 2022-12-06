class FirebaseContainer {
    constructor(myTable) {
        this.myTable = myTable;
    }

    async deleteById(myId) {
        try {
            const doc = this.query.doc(`${myId}`);
            const item = await doc.delete();
            console.log("Item eliminado ", item)
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            const productsCol = collection(db, this.myTable);
            const productsSnapshot = await getDocs(productsCol);
            const array = productsSnapshot.docs.map(doc => doc.data());
            for (element in array) {
                let myId = array[element].id;
                this.deleteById(myId);
            }
        } catch (error) {
            console.log(error);
        }

        console.log('productos eliminados')
    }

    async save(item) {
        try {
            const doc = this.query.doc();
            const theProductId = doc.id;            
            await doc.set(item);
            console.log(" the Id ",theProductId)
            return theProductId;
        }
        catch (e) {
            console.log(e);
        }
    }

    async saveArray(array) {
        for (let item in array) {
            this.save(array[item])
        }
        console.log('Producto/s Agregado/s');
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get();
            let docs = querySnapshot.docs;
            const response = docs.map(doc => ({ ...doc.data(), id: doc.id }));
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(myId) {
        try {    
            const doc = this.query.doc(`${myId}`);
            const item = await doc.get(doc);
            const response = ({ ...item.data(), id: item.id });
            console.log(" en getById", item.data())
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteLoadExpress(array) {
        try {
            await this.deleteAll();
            try {
                await this.saveArray(array)
            } catch (error) {
                console.log(error);
            }
        }
        catch (error) {
            console.log(error);
            try {
                await this.saveArray(array)
            } catch (error) {
                console.log(error);
            }
        }
    }

    async modifyById(myId, myJson) {
        try {
            const doc = this.query.doc(`${myId}`);
            let item = await doc.update(myJson);
            console.log("Item actualizado ", item)
        } catch (error) {
            console.log(error)
        }

    }

    async saveLine(object) {
        try {

            await this.save(object)

        } catch (error) {
            console.log(error)
            return error
        }

    }

    async deleteProdById(id, id_prod, indexp, productArray) {
        console.log("The id ", id)
        console.log("Id_prod ", id_prod)
        try {
            const element = await this.getById(id)

            console.log(element)

            const timestamp = element.timestamp;

            let removedProduct = productArray.splice(indexp, 1);

            const modifiedCart = {
                id: id,
                timestamp: timestamp,
                productos: productArray,
            }

            this.modifyById(id, modifiedCart)

        } catch (error) {
            console.log(error)
        }
    }

}

export default FirebaseContainer;