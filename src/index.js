const app = require('./app');
const PORT = 4001;

app.listen(PORT, ()=>{
    console.log(`Servidor na porta ${PORT}`);
})