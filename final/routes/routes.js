const express = require('express')
const router = express.Router()
router.use(express.json())

const Module = require('../models/model1')

//Base URL for the Terraform Registry
const terraformRegistryBaseURL = 'https://registry.terraform.io/v1/modules'
const privateRegistryBaseURL = 'https://private-registry.example.com'


// LIST ALL VERSIONS
router.get('/:namespace/:name/:system/:versions', async (req, res) => {
    const { namespace, name, system } = req.params
    try {
        const modules = await Module.find({namespace, name, system })
        const versions = modules.map(m => ({version: m.version}))
        res.json({ modules: [{ versions }] });
    } catch (error) {
        res.status(404).json({ message: "No versions found", error: error.toString() });
    }
})

// DONWLOAD SPECIFIC MODULE VERSION

router.get('/:namespace/:name/:system/:version/download', async (req, res) => {
    const { namespace, name, system, version } = req.params
    try {
        const module = await Module.findOne({ namespace, name, system, version })
        if(!module){
            return res.status(404).send('Module not found!')
        }
        res.set('X-Terraform-Get', module.source);
        return res.status(204).send();
    } catch (error) {
        
    }
})

module.exports = router