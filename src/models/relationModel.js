function relationModels(sequelize){
    const { Car, Client, Models, Marque, Reservation } = sequelize.models;

    Client.hasMany(Reservation)
    Reservation.belongsTo(Client)
    Car.hasMany(Reservation)
    Reservation.belongsTo(Car)
    Car.belongsTo(Models)
    Models.hasMany(Car)
    Models.belongsTo(Marque)
    Marque.hasMany(Models)

}

module.exports = { relationModels };