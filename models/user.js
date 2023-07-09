const mongoose = require('mongoose');

// schema
const userSchema = mongoose.Schema({
    user: String,
    name: String,
    rol: String,
    pass: {
        type:String,
        required:true
    }
})

exports.User = mongoose.model('User', userSchema);
