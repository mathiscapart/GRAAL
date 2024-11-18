const { models } = require('../models');
const { getIdParam } = require('./getId');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const car = await models.Client.findAll();
    res.status(200).json(car);
});

router.get('/:id', async (req, res) => {
    const id = getIdParam(req);
    const car = await models.Client.findByPk(id);
    if (car) {
        res.status(200).json(car);
    } else {
        res.status(404).send('404 - Not found');
    }
})

router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        await models.Client.create(req.body);
        res.status(201).end();
    }catch (error){
        console.log(error)
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
    }
})

router.put('/:id', async (req, res) => {
    if (req.body.id) {
        res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.')
    }else{
        await models.Client.update(req.body, {
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end();
    }
})

router.delete('/:id', async (req, res) => {
    if (req.body.id) {
        res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.')
    }else{
        try {
            await models.Client.destroy({
                where: {
                    id: getIdParam(req)
                }
            });
            res.status(200).end();
        }catch (error){
            console.log(error)
            res.status(500).send('Server')

        }

    }
})

module.exports = router;
