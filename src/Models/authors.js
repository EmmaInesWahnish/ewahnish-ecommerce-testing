import mongoose from 'mongoose';
const { Schema, model } = mongoose

const authorCollection = 'autores';

const AuthorSchema = new Schema({
    author: {
        email: { type: String, required: true},
        nombre: { type: String, required: false, max: 100 },
        apellido: { type: String, required: false, max: 100 },
        edad: { type: Number, required: false},
        alias: { type: String, required: false},
        avatar: { type: String, required: false },
    },
})

AuthorSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

AuthorSchema.set('toJSON', {
    virtuals: true
});

const AuthorModel = model(authorCollection, AuthorSchema)
export default AuthorModel;