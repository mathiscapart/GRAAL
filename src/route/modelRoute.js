const { models } = require('../models');
const { getIdParam } = require('./getId');
const express = require('express');
const {where} = require("sequelize");
const router = express.Router();

router.get('/', async (req, res) => {
    const car = await models.Models.findAll();
    res.status(200).json(car);
});

router.get('/:id', async (req, res) => {
    const id = getIdParam(req);
    const car = await models.Models.findByPk(id);
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
        await models.Models.create(req.body);
        res.status(201).end();
    }
})

router.put('/:id', async (req, res) => {
    if (req.body.id) {
        res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.')
    }else{
        await models.Models.update(req.body, {
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end();
    }
})

router.delete('/:id', async (req, res) => {
    if (req.body.id) {
        await models.Models.destroy({
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end();
    }
})

router.get('/car/:id', async (req, res) =>{
    const id = getIdParam(req);
    const car = await models.Car.findAll({
        where: {
            ModelId: id
        }
    });
    res.status(200).json(car);
})

module.exports = router;