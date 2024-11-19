const { models } = require('../models');
const { getIdParam } = require('./getId');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const client = await models.Client.findAll();
    res.status(200).json(client);
});

router.get('/:id', async (req, res) => {
    const id = getIdParam(req);
    const client = await models.Client.findByPk(id);
    if (client) {
        res.status(200).json(client);
    } else {
        res.status(404).send('404 - Not found');
    }
})

router.post('/', async (req, res, next) => {
    try{
        await models.Client.create(req.body);
        res.status(201).end('Client created successfully.');
    }catch (err){
        next(err);
    }
})

router.put('/:id', async (req, res) => {
    const client = await models.Client.findByPk(getIdParam(req));

    if (client){
        await models.Client.update(req.body, {
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end('Client updated successfully.');
    }else{
        res.status(404).send('404 not found');
    }
})

router.delete('/:id', async (req, res) => {
    const client = await models.Client.findByPk(getIdParam(req));

    if (client){
        await models.Client.destroy({
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end('Client deleted successfully.');
    }else{
        res.status(404).send('404 not found');
    }
})

module.exports = router;
