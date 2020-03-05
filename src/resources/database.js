const mysql = require('mysql');
const moment = require('moment');

class Database {
  constructor() {
    this._connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '123123',
      database: 'petshop'
    });
    console.log('DATABASE: Conexao criada');
  }

  getConnection() {
    return this._connection;
  }

  connect() {
    this._connection.connect((error) => {
      if (error) {
        console.log('DATABASE: ' + error);
      } else {
        console.log('DATABASE: Banco de dados conectado')
      }
    });
  }

  createTableAtendimento() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Atendimento (
        id INT NOT NULL AUTO_INCREMENT,
        client_name VARCHAR(50) NOT NULL,
        pet_name VARCHAR(20),
        service VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL,
        observations TEXT,
        data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
        dataCriacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
      )
    `;
    this._connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('DATABASE: Tabela Atendimento criada com sucesso');
      }
    });
  }

  addAtendimento(response, atendimento) {
    atendimento.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH-MM-SS');
    const dataCriacao = new Date();
    const dataEhValida = moment(atendimento.data, 'YYYY-MM-DD HH-MM-SS').isSameOrAfter(dataCriacao);
    const clienteEhValido = atendimento.client_name.length > 2;
    if (dataEhValida && clienteEhValido) {
      const atendimentoDatado = { ...atendimento, dataCriacao };
      const sql = 'INSERT INTO Atendimento SET ?';
      this._connection.query(sql, atendimentoDatado, (error, result) => {
        if (error) {
          console.log('DATABASE: ' + error);
          response.status(400).json(error);
        } else {
          console.log('DATABASE: Atendimento salvo com sucesso');
          response.status(201).json(result);
        }
      });
    } else {
      let message = {}
      if (!dataEhValida) {
        message.data = 'Data invalida. Esta deve ser maior que a data atual';
      }
      if (!clienteEhValido) {
        message.cliente = 'Cliente invalido. Sao necessarios mais de 2 letras para o nome';
      }
      response.status(400).json(message);
    }
  }

  sendAtendimentos(response) {
    const sql = 'SELECT * FROM Atendimento';
    this._connection.query(sql, (error, result) => {
      if (error) {
        console.log('DATABASE: ' + error)
        response.status(400).json(error);
      } else {
        response.status(201).json(result);
      }
    });
  }

  sendAtendimento(response, id) {
    const sql = 'SELECT * FROM Atendimento WHERE id=?';
    this._connection.query(sql, [id], (error, result) => {
      if (error) {
        console.log('DATABASE: ' + error)
        response.status(400).json(error);
      } else {
        response.status(201).json(result);
      }
    });
  }

  patchAtendimento(response, atendimento, id) {
    const sql = 'UPDATE Atendimento SET ? WHERE id=?';
    
    if (atendimento.data) {
      atendimento.data = moment(atendimento.data, 'YYYY-MM-DDTHH:MM:SS.000Z').format('YYYY-MM-DD HH-MM-SS');
    }
    if (atendimento.dataCriacao) {
      atendimento.dataCriacao = moment(atendimento.dataCriacao, 'YYYY-MM-DDTHH:MM:SS.000Z').format('YYYY-MM-DD HH-MM-SS');
    }

    this._connection.query(sql, [atendimento, id], (error, result) => {
      if (error) {
        console.log('DATABASE: ' + error)
        response.status(400).json(error);
      } else {
        response.status(201).json(result);
      }
    });
  }

  deleteAtendimento(response, id) {
    const sql = 'DELETE FROM Atendimento WHERE id=?';
    this._connection.query(sql, [id], (error, result) => {
      if (error) {
        console.log('DATABASE: ' + error)
        response.status(400).json(error);
      } else {
        response.status(201).json(result);
      }
    });
  }

}

module.exports = new Database();