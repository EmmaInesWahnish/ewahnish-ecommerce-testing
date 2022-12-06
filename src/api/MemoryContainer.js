class MemoryContainer {
    
    constructor() {

        this.objectArray = [];
    }

    async getAll() {
        try {

            return this.objectArray;

        } catch (error) {
            console.log(error)
        }
    }

    async save(object) {
        try {
            const elements = await this.getAll();

            const newID = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;

            object.id = newID;

            elements.push(object);

            return object;

        } catch (error) {

            console.log(error)
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

            const whichId = elements.findIndex(element => element.id === id);

            if (whichId !== -1) {

                let removedObject = elements.splice(whichId, 1);

                console.log("Deleted item ", removedObject);

                return removedObject;
            } else {

                console.log("There is no item with id ", id);

            }
        } catch (error) {
            console.log(error)
        }
    }

    async modifyById(id, item) {
        try {
            const elements = await this.getAll()

            const whichId = elements.findIndex(element => element.id === id);

            if (whichId !== -1) {

                let modifiedObject = elements.splice(whichId, 1, item);

                console.log("Modified item ", modifiedObject);

                return modifiedObject;

            } else {

                console.log("There is no item with id ", id);

            }
        } catch (error) {

            console.log(error)
        }
    }

    async deleteAll() {
        try {

            this.objectArray = [];

            return [...this.objectArray];

        } catch (error) {

            console.log(error)
        }
    }

    async saveArray(array) {
        let id = 0;

        let elements = [];

        try {
            elements = await this.getAll();

            if (elements.length > 0) { id = elements[elements.length - 1].id; }

            array.forEach(function (element) {
                id = id + 1;
                element.id = id;
                elements.push(element);
            })
        }
        catch (error) {
            console.log(error);

            array.forEach(function (element) {
                id = id + 1;
                element.id = id;
                elements.push(element);
            })
        }

        return [...elements]
    }

}

export default MemoryContainer 
