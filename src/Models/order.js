import mongoose from "mongoose";
const { Schema, model } = mongoose

const orderCollection = 'order';

const OrderSchema = new Schema({
    timestamp: { type: Date, required: true },
    user_id: {type: String},
    productos: [{
        id: { type: String, required: true},
        nombre: { type: String, required: true, max: 100 },
        descripcion: { type: String, required: true, max: 100 },
        codigo: { type: String, required: true, max: 100 },
        foto: { type: String, required: true },
        precio: { type: Number, required: true },
        stock: { type: Number, required: true },
        cantidad: {type: Number, required: true}
    }]
})

OrderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

OrderSchema.set('toJSON', {
    virtuals: true
});

const OrderModel = model(orderCollection, OrderSchema)

export default OrderModel;