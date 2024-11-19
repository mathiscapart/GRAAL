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
    await models.Marque.create(req.body);
    res.status(201).end('Marque created');
})

router.put('/:id', async (req, res) => {
    const marque = await models.Marque.findByPk(getIdParam(req));

    if (marque) {
        await models.Marque.update(req.body, {
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end('Marque successfully updated');
    }else{
        res.status(404).send('404 - Not found');
    }
})

router.delete('/:id', async (req, res) => {
    const marque = await models.Marque.findByPk(getIdParam(req));

    if (marque) {
        await models.Marque.destroy({
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end('Marque successfully deleted.');
    }else{
        res.status(404).send('404 - Not found');
    }
})

module.exports = router;
