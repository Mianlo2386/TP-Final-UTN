const mongoose = require('mongoose');

// schema
const categoriaSchema = mongoose.Schema({
    nombre: {
        type:String,
        required:true
    },
    icono: {
        type:String,
    },
    color: {
        type:String,
    }
})


exports.Categoria = mongoose.model('Categoria', categoriaSchema);
