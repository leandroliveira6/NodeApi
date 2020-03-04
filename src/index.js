const customExpress = require('./configurations/custom-express');
const database = require('./resources/database');

database.connect();
database.createTableAtendimento();

const app = customExpress();
app.listen(3000, () => console.log('Servidor iniciado'));
