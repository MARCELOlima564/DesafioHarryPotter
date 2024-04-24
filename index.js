const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'desafioharrypotter',
    password: 'ds564',
    port: 7007, // ou 7007
  });

  app.use(express.json());