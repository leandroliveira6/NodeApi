const database = require('../resources/database');

module.exports = (app) => {
  app.get('/atendimentos', (req, res)=>res.send('Pagina de atendimentos'));
  app.post('/atendimentos', (req, res)=>{
    console.log(req.body);
    database.saveAtendimento(req.body, res);
    // res.send('Pagina de atendimentos. Dados enviados');
  });
}