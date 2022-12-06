class SqlContainer {
    constructor(myDbConnection, myTable) {
        this.myDbConnection = myDbConnection;
        this.myTable = myTable;
    }

    async deleteById(myId) {
        try {
            await this.myDbConnection(this.myTable)
                .where({ id: myId })
                .del()
        } catch (error) {
            console.log(error);
        }

        console.log('producto eliminado')

    }

    async deleteAll() {
        try {
            await this.myDbConnection(this.myTable).del()
        }
        catch (error) {
            console.log(error);
        }

        console.log('productos eliminados')
    }

    async save(item) {
        const connection = this.myDbConnection
        const theTable = this.myTable
        let theProductId = ''
        try {
            await connection(theTable).insert(item);
            const array = await this.getAll();
            (array.length === 0)? theProductId = 0: theProductId = array[array.length - 1].id;
            return theProductId;
        }
        catch (e) {
            console.log(e);
        }

        console.log('Producto/s Agregado/s');
    }

    async saveArray(array) {
        const connection = this.myDbConnection
        const theTable = this.myTable
            try {
                await connection(theTable).insert(array);
            }
            catch (e) {
                console.log(e);
            }
        console.log('Producto/s Agregado/s');
    }

    async getAll() {
        try {
            let array = await this.myDbConnection.from(this.myTable).select("*");
            return array;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(myId) {
        try {
            let array = await this.myDbConnection.from(this.myTable).select("*").where({ id: myId });
            return array;
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
            await this.myDbConnection(this.myTable).where({ id: myId }).update(myJson);
        } catch (error) {
            console.log(error)
        }

        console.log('producto modificado')
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

            const timestamp = element[0].timestamp;

            let removedProduct = productArray.splice(indexp, 1);

            const modifiedCart = {
                id: id,
                timestamp: timestamp,
                productos: JSON.stringify(productArray),
            }

            this.modifyById(id, modifiedCart)

        } catch (error) {
            console.log(error)
        }
    }

}

export default SqlContainer;