import fs from 'fs';

class AnyContainer {
    constructor(anyFile){
        this.anyFile = anyFile
    }

    async getAll() {
        try {
            const fileData = await fs.promises.readFile(this.anyFile)

            const array = JSON.parse(fileData)

            return array
           
        } catch (error) {
           const array = [];
           return array
        }
    }


    async save(object) {
        try { 
            const elements = await this.getAll()                                    
            const theProductId = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1
            
            object.id = theProductId

            elements.push(object)

            const fileData = JSON.stringify(elements, null, 3)

            await fs.promises.writeFile(this.anyFile, fileData)


            return theProductId
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getById(id) {
        try {
            
            const elements = await this.getAll()

            const elementFound = elements.find((element) => element.id == id)

            return elementFound
            
        } catch (error) {
            console.log(error)    
        }
    }

    async deleteById(id) {
        try {
            const elements = await this.getAll()

            const whichId = elements.findIndex(element => element.id == id);

            if (whichId !== -1) {
                let removedObject = [];
                removedObject = elements.splice(whichId, 1);
                console.log("Deleted item ", removedObject);
                await fs.promises.writeFile(this.anyFile, JSON.stringify(elements, null, 3))
                return removedObject;    
            } else {
                console.log("There is no item with id ", id);
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async modifyById(id, item) {
        console.log("Llegaron ",id," ",item)
        try {
            const elements = await this.getAll()

            const whichId = elements.findIndex(element => element.id == id);

            if (whichId !== -1) {
                let modifiedObject = elements.splice(whichId, 1, item);
                console.log("Modified item ", modifiedObject);
                await fs.promises.writeFile(this.anyFile, JSON.stringify(elements, null, 3))
                return modifiedObject;    
            } else {
                console.log("There is no item with id ", id);
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProdById(id, id_prod, indexp, productArray) {
        try {
            const elements = await this.getAll()

            const whichId = elements.findIndex(element => element.id == id);

            let removedProduct = productArray.splice(indexp, 1);

            const modifiedCart = {
                id: id,
                timestamp: elements[whichId].timestamp,
                productos: productArray,
            }

            if (whichId !== -1) {
                let modifiedObject = elements.splice(whichId, 1, modifiedCart);
                console.log("item eliminado ", modifiedObject)
                await fs.promises.writeFile(this.anyFile, JSON.stringify(elements, null, 3))
                return modifiedObject;    
            } else {
                console.log("There is no item with id ", id);
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.anyFile, JSON.stringify([]));
            return [];
        } catch (error) {
            console.log(error)
        }
    }

    async saveArray(array) {
        let id = 0;
         try {
            const elements = await this.getAll();
            if(elements.length > 0) {id = elements[elements.length - 1].id;}
            console.log(id);
            array.forEach(function (element) {
                id = id + 1;
                element.id = id
                elements.push(element);
            })
            try{
                await fs.promises.writeFile(this.anyFile, JSON.stringify(elements),)
            }
            catch(error){
                console.log(error);
            }
        }
        catch (error) {
            console.log(error)
            const elements = [];
            console.log(id);
            array.forEach(function (element) {
                id = id + 1;
                element.id = id
                elements.push(element);
            })
            try{
                await fs.promises.writeFile(this.anyFile, JSON.stringify(elements),)
            }
            catch(error){
                console.log(error);
            }
        }
    }

    async deleteLoadExpress(array) {
        try {
            //deletes the file
            await fs.promises.unlink(this.anyFile);
            try {
                await this.saveArray(array);
            }
            catch(error){
                console.log(error);
            }
    
        }
        catch (error) {
            console.log(error);
            try {
                await this.saveArray(array);
            }
            catch(error){
                console.log(error);
            }
    
        }
    }

    async saveLine(object) {
        try { 
            let elements = await this.getLines()                                    
            if (elements.length === 0){ elements= []}

            elements.push(object)

            const fileData = JSON.stringify(elements, null, 3)

            await fs.promises.writeFile(this.anyFile, fileData)

        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getLines() {
        try {
            const fileData = await fs.promises.readFile(this.anyFile)

            const array = JSON.parse(fileData)

            return array
           
        } catch (error) {
           const array = [];
           return array
        }
    }
    
}

export default AnyContainer 
