const { models } = require('../models');
const { getIdParam } = require('./getId');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const car = await models.Reservation.findAll();
    res.status(200).json(car).end("");
});

router.get('/:id', async (req, res) => {
    const id = getIdParam(req);
    const car = await models.Reservation.findByPk(id);
    if (car) {
        res.status(200).json(car);
    } else {
        res.status(404).send('404 - Not found');
    }
})

router.post('/', async (req, res) => {
    try{
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
    }catch (error){
        console.log(error)
        res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
    }
})

router.put('/:id', async (req, res) => {
    if (req.body.id) {
        res.status(400).send('Bad request: ID should not be provided, since it is determined automatically by the database.')
    }else{
        await models.Reservation.update(req.body, {
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end();
    }
})

router.delete('/:id', async (req, res) => {
    if (req.body.id) {
        await models.Reservation.destroy({
            where: {
                id: getIdParam(req)
            }
        });
        res.status(200).end();
    }
})

module.exports = router;
