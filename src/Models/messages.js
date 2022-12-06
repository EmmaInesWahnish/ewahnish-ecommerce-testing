import mongoose from 'mongoose';
const { Schema, model } = mongoose

const messageCollection = 'mensajes';

const MessageSchema = new Schema({
    timestamp: { type: Date, required: true },
    author: {
        email: { type: String, required: true},
        nombre: { type: String, required: false, max: 100 },
        apellido: { type: String, required: false, max: 100 },
        edad: { type: Number, required: false},
        alias: { type: String, required: false},
        avatar: { type: String, required: false },
    },
    text: { type: String, required: true},
})

MessageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

MessageSchema.set('toJSON', {
    virtuals: true
});

const MessageModel = model(messageCollection, MessageSchema)

export default MessageModel;