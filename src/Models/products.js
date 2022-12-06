import mongoose from "mongoose";
const { Schema, model } = mongoose

const productCollection = 'productos';

const ProductSchema = new Schema({
    timestamp: { type: Date, required: true },
    nombre: { type: String, required: true, max: 100 },
    descripcion: { type: String, required: true, max: 100 },
    codigo: { type: String, required: true, max: 100 },
    foto: String,
    precio: { 
        type: Number,
        min: [300, 'Precio inferior al mínimo'], 
        required: true },
    stock: { 
        type: Number,
        min: [1, 'El stock no puede ser inferior a 1'], 
        required: true }
})

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ProductSchema.set('toJSON', {
    virtuals: true
});

const ProductModel = model(productCollection, ProductSchema)

export default ProductModel;