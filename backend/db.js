import mongoose from 'mongoose';

const { Schema } = mongoose;

mongoose.connect('mongodb+srv://admin:Asmeth1234@cluster0.j0myoee.mongodb.net/Paytm_db');


const User_schema = new Schema({
    First_Name: String, // String is shorthand for {type: String}
    Second_Name: String,
    Email: String,
    Password: String
});

const Accounts_schema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }, // String is shorthand for {type: String}
    balance: Number
});

const users = mongoose.model('User', User_schema);
const Account = mongoose.model('Account', Accounts_schema);

export { users,Account };