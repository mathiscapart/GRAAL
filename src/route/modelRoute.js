const { models } = require('../models');
const { getIdParam } = require('./getId');
const express = require('express');
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
    await models.Models.create(req.body);
    res.status(201).end('Model created successfully.');
})

router.put('/:id', async (req, res) => {
    const model = await models.Models.findByPk(getIdParam(req));

    if (model){
        await models.Models.update(req.body, {
                where: {
                    id: getIdParam(req)
                }
            });
            res.status(200).end('Model updated successfully.');
    }else{
        res.status(404).send('404 - Not Found')
    }
})

router.delete('/:id', async (req, res) => {
    const model = await models.Models.findByPk(getIdParam(req));

    if (model) {
        await models.Models.destroy({
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end('Model deleted successfully.');
    }else{
        res.status(404).send('404 - Not Found')
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
