const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'desafioharrypotter',
    password: 'ds564',
    port: 7007, 
  });

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('A rota está funcionando');
});

app.get('/bruxo', async (req, res) =>{
  try {
    const resultado = await pool.query('SELECT * FROM  bruxos');
    res.json({
      total: resultado.rowCount,
      bruxos: resultado.rows,
    })
  } catch (error) {
    console.error('Erro ao obter os bruxos', error);
    res.status(500).send('Erro ao obter os bruxos cadastrados');
  }
});

app.get('/varinha', async (req, res) =>{
  try {
    const resultado = await pool.query('SELECT * FROM propriedadesvarinha');
    res.json({
      total: resultado.rowCount,
      varinhas: resultado.rows,
    })
  } catch (error) {
    console.error('Erro ao obter as varinhas', error);
    res.status(500).send('Erro ao obter as varinhas');
  }
});

app.post('/bruxo', async (req, res) => {
  try {
      const { nome, idade, casa, habilidade, statusdesangue} = req.body;

      let sangues=['puro', 'mestiço', 'trouxa'];
      let casas=['Grifinória', 'Sonserina', 'Lufa-Lufa', 'Corvinal'];

      if(!sangues.includes(statusdesangue)){
          return res.status(400).send({ message: 'Status de Sangue inválida'})
      }

      if(!casas.includes(casa)){
          return res.status(400).send({ message: 'Casa de Hogwarts inválida'})
      }

      await pool.query('INSERT INTO bruxos (nome, idade, casa, habilidade, statusdesangue) VALUES ($1, $2, $3, $4, $5)', [nome, idade, casa, habilidade, statusdesangue]);
      res.status(201).send({ mensagem: 'Bruxo criado com sucesso!' });
  }   catch (error) {
      console.error('Erro ao criar bruxo', error);
      res.status(500).json({ message: 'Erro ao criar bruxo' });
  }
});

app.post('/varinha', async (req, res) => {
  try {
      const { material, comprimento, nucleo, datadefabricacao } = req.body;

      await pool.query('INSERT INTO propriedadesvarinha (material, comprimento, nucleo, datadefabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, datadefabricacao]);
      res.status(201).send({ mensagem: 'Varinha criado com sucesso!' });
  }   catch (error) {
      console.error('Erro ao criar varinha', error);
      res.status(500).json({ message: 'Erro ao criar varinha' });
  }
});

app.delete('/bruxo/:id', async (req, res) => {
  try {
      const { id } = req.params;
       await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
      res.status(200).send({mensagem: 'Bruxo excluido com sucesso'});
  } catch (error) {
      console.error('Erro ao excuir bruxo', error); 
     res.status(500).send('Erro ao excluir bruxo');
  }
});

app.delete('/varinha/:id', async (req, res) => {
  try {
      const { id } = req.params;
       await pool.query('DELETE FROM propriedadesvarinha WHERE id = $1', [id]);
      res.status(200).send({mensagem: 'Varinha excluida com sucesso'});
  } catch (error) {
      console.error('Erro ao excluir varinha', error); 
     res.status(500).send('Erro ao excluir varinha');
  }
});

app.put('/bruxo/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { nome, idade, casa, habilidade, statusdesangue} = req.body;

      await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, statusdesangue = $5 WHERE id = $6', [nome, idade, casa, habilidade, statusdesangue, id]);
      res.status(201).send({mensagem: 'Bruxo editado com sucesso'});
  } catch (error) {
      console.error('Erro ao editar bruxo', error); 
     res.status(500).send('Erro ao editar bruxo');
  }
});

app.put('/varinha/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { material, comprimento, nucleo, datadefabricacao } = req.body;

      await pool.query('UPDATE propriedadesvarinha SET material = $1, comprimento = $2, nucleo = $3, datadefabricacao = $4  WHERE id = $5', [material, comprimento, nucleo, datadefabricacao, id]);
      res.status(201).send({mensagem: 'Varinha editada com sucesso'});
  } catch (error) {
      console.error('Erro ao editar varinha', error); 
     res.status(500).send('Erro ao editar varinha');
  }
});

app.get('/bruxo/:id', async (req,res) => {
  try {
      const { id } = req.params;
      const resultado = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
      if(resultado.rowCount == 0){
          res.status(404).send({mensagem: 'Id não encontrado'})
      } else{
          res.json({
              bruxo: resultado.rows[0],
          });
      }
      
  } catch (error) {
      console.error('Erro ao obter varinha pelo id', error); 
      res.status(500).send('Erro ao obter varinha pelo id');
  }
})

app.get('/varinha/:id', async (req,res) => {
  try {
      const { id } = req.params;
      const resultado = await pool.query('SELECT * FROM propriedadesvarinha WHERE id = $1', [id]);
      if(resultado.rowCount == 0){
          res.status(404).send({mensagem: 'Id não encontrado'})
      } else{
          res.json({
              varinha: resultado.rows[0],
          });
      }
      
  } catch (error) {
      console.error('Erro ao obter varinha pelo id', error); 
      res.status(500).send('Erro ao obter varinha pelo id');
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

