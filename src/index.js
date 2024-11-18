const sequelize = require('./models/index');
const app = require('./route')
const port = 3000;

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
        await sequelize.sync({alter:true});
        console.log("All models were synchronized successfully")
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}


async function init() {
    await assertDatabaseConnectionOk();

    app.listen(port, () => {
        console.log(`Express server started on port ${port}.`);
    });
}

init();