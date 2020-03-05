const database = require('../resources/database');

module.exports = (app) => {
  app.get('/atendimentos', (req, res) => {
    database.sendAtendimentos(res);
  });

  app.get('/atendimentos/:id', (req, res) => {
    database.sendAtendimento(res, parseInt(req.params.id));
  });

  app.post('/atendimentos', (req, res) => {
    database.addAtendimento(res, req.body);
    // res.send('Pagina de atendimentos. Dados enviados');
  });

  app.patch('/atendimentos/:id', (req, res) => {
    database.patchAtendimento(res, req.body, parseInt(req.params.id));
  });

  app.delete('/atendimentos/:id', (req, res) => {
    database.deleteAtendimento(res, parseInt(req.params.id));
  });
}