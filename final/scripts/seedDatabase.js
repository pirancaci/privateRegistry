
require('dotenv').config()
const mongoose = require('mongoose');
const Module = require('../models/modules/module_1')
const connectDB = require('../db/connect')

const seedData = async () => {
    await connectDB(process.env.MONGO_URI)

    const modules = [
        {
            namespace: 'network',
            name: 'module_1',
            system: 'aws',
            version: '1.0.0',
            source: 'https://github.com/pirancaci/privateRegistry/releases/tag/1.0.0'
        },
        {
            namespace: 'network',
            name: 'module_1',
            system: 'aws',
            version: '1.1.2',
            source: 'https://github.com/pirancaci/privateRegistry/releases/tag/1.0.0'
        }
    ];

    try {

        await Module.deleteMany({}) //clearing existing modules before inserting any
        await Module.insertMany(modules)
    } catch (error) {
        console.error('ERRORORRR', error.message)
    } finally {
        mongoose.disconnect()
    }

}

seedData()