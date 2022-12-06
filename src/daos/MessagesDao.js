import MemoryContainer from '../api/MemoryContainer.js';
import generateMessage from '../Models/messages.js';
import generateMessageOwner from '../js/generateMessageOwner.js';

class MessagesDao extends MemoryContainer {
    constructor() { super()};

    populate(quantity=5) {
        this.deleteAll();
        let newMessages = [];
        for(let i=0; i < quantity; i++ ){
            this.save(generateMessage(i+1))
        }
        try {
            newMessages = this.getAll();
        } 
        catch(error){
            console.log(error);
        }

        return newMessages;
    }

    populateOwner(quantity=20) {
        this.deleteAll();
        let newMessages = [];
        for(let i=0; i < quantity; i++ ){
            this.save(generateMessageOwner(i+1))
        }
        try {
            newMessages = this.getAll();
        } 
        catch(error){
            console.log(error);
        }

        return newMessages;
    }
}
export default MessagesDao