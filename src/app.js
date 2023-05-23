//Config do express
const express = require('express');
const app     = express();
const path    = require('path');
const router  = require('./router');




require('dotenv').config();

//Registrar motor ejs ao express
app.engine('ejs', require('ejs').renderFile);
//Definir qual mecanismos de views, ejs.
app.set('view engine', 'ejs');
//Definir o caminho absoleto ate a pasta views
app.set('views', path.join(__dirname, 'views'));

// Usar o middleware
app.use(router);


// Definir o caminho absoleto ate a pasta public para arquivos dinamicos
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    if (path.extname(filePath) === '.css') {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

console.log(process.env.TOKEN);
app.use(express.json());
module.exports = app