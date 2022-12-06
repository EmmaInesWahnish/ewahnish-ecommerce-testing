import mongoose from 'mongoose';

const collection = 'users';

const usersSchema = new mongoose.Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    age: Number,
    avatar: String,
    cart_number: String,
    delivery_address: String,
})

const usersService = mongoose.model(collection, usersSchema);

export default usersService;