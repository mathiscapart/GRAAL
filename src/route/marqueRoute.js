const { models } = require('../models');
const { getIdParam } = require('./getId');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const car = await models.Marque.findAll();
    res.status(200).json(car);
});

router.get('/:id', async (req, res) => {
    const id = getIdParam(req);
    const car = await models.Marque.findByPk(id);
    if (car) {
        res.status(200).json(car);
    } else {
        res.status(404).send('404 - Not found');
    }
})

router.post('/', async (req, res) => {
    if (req.body.id) {
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
    } else {
        await models.Marque.create(req.body);
        res.status(201).end();
    }
})

router.put('/:id', async (req, res) => {
    if (req.body.id) {
        res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.')
    }else{
        await models.Marque.update(req.body, {
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end();
    }
})

router.delete('/:id', async (req, res) => {
    if (req.body.id) {
        await models.Marque.destroy({
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end();
    }
})

module.exports = router;
