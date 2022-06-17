const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username:{
        default: "",
        required: true,
        unique: true,
        type: String
    },
    name:{
        default: "",
        required: true,
        type: String
    },
    email:{
        required: true,
        type: String,
        unique: true
    },
    password:{
        required: true,
        type: String,
    }
},{timestamps: true},)

const User = mongoose.model('Normaluser',userSchema)
module.exports = User