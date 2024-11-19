const { models } = require('../models');
const { getIdParam } = require('./getId');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const reservation = await models.Reservation.findAll();
    res.status(200).json(reservation);
});

router.get('/:id', async (req, res) => {
    const id = getIdParam(req);
    const reservation = await models.Reservation.findByPk(id);
    if (reservation) {
        res.status(200).json(reservation);
    } else {
        res.status(404).send('404 - Not found');
    }
})

router.post('/', async (req, res) => {
    const carReservation = await models.Reservation.findAll({
        where:{
            "CarId": req.body['CarId']
        }
    })

    const startDate = new Date(req.body['startDate'])
    const endDate = new Date(req.body['endDate'])

    for (let i = 0; i < carReservation.length; i++) {
        const startReservation = carReservation[i].dataValues['startDate']
        const endReservation = carReservation[i].dataValues['endDate']
        if( startDate >= startReservation && startDate <= endReservation || endDate >= startReservation && endDate <= endReservation){
           return res.status(409).end("Reservation not possible");
        }
    }

    await models.Reservation.create(req.body);
    res.status(201).end("Reservation OK");
})

router.put('/:id', async (req, res) => {
    const reservation = await models.Reservation.findByPk(getIdParam(req));

    if (reservation){
        await models.Reservation.update(req.body, {
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end('Reservation modified successfully.');
    }else{
        res.status(404).send('404 - Not found')
    }

})

router.delete('/:id', async (req, res) => {
    const reservation = await models.Reservation.findByPk(getIdParam(req));

    if (reservation) {
        await models.Reservation.destroy({
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end('Reservation deleted successfully.');
    }else{
        res.status(404).send('404 - Not found')
    }
})

module.exports = router;
