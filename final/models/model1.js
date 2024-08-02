const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
    namespace: {
        type: String, 
        required: true    
    }, 
    name: {
        type: String, 
        required: true
    },
    system: {
        type: String, 
        required: true
    }, 
    version: {
        type: String, 
        required: true
    }, 
    source: {
        type: String, 
        required: true
    }, 
    origin: {
        type: String,
        required: true // Indicates if the module is from Terraform registry or private repo
    }
})

const Module = mongoose.model('Module', moduleSchema)
module.exports = Module


