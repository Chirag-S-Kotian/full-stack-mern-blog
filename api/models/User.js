const mongoose = require ('mongoose');
const { Schema,model } = mongoose;

const UserSchema = new Schema({
    userName:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    userPassword:{
        type:String,
        required:true,
    },
});

const UserModel = model('User' ,UserSchema);

module.exports = UserModel;