import mongoose from 'mongoose';

const collection = 'auxiliar';

const auxiliarSchema = new mongoose.Schema({
    _id: Number,
    auxurl: String,
})

const auxiliarService = mongoose.model(collection, auxiliarSchema);

export default auxiliarService;