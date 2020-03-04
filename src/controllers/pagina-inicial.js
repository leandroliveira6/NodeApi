module.exports = (app) => {
  return app.get('/', (req, res)=>res.send('Pagina inicial'));
}