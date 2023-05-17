
const router = require('express').Router();
const options = {
    headers: {
        Authorization: "Bearer ",
        'Client-Id' : ''
    }
}


let Streamers = [];

let picture;
let nome;
let nameGame;
let numEspectadore;

// Parametros da url
const queryParms = new URLSearchParams ({
    language: 'pt',
    first: 6,
    sort: 'viewers'
}).toString()


//Buscar Streamers mais vistos ao vivos e enviar ao index
async function GetTopStreamers () {
    

    let url = `https://api.twitch.tv/helix/streams?${queryParms}`
    const response = await fetch(url, options);
    const data = await response.json();
   

    for(let dates of data.data){
        
        const reponseName = await fetch(`https://api.twitch.tv/helix/users?login=${dates.user_name}`, options)
        const dateName = await reponseName.json();
        
        nome            = dates.user_name;
        nameGame        = dates.game_name;
        numEspectadore  = dates.viewer_count;
        picture         = dateName.data[0].profile_image_url;


        if(numEspectadore > 999){
            numEspectadore = (numEspectadore/1000).toFixed(1).toLocaleString('pt-BR') + 'mil'
        }
        if(numEspectadore > 999999){
            numEspectadore = (numEspectadore/1000000).toFixed(1).toLocaleString('pt-BR') + 'M'
        }
        if(numEspectadore >  999999999){
            numEspectadore = (numEspectadore/1000000000).toFixed(1).toLocaleString('pt-BR') + 'B'
        }

        Streamers.push({
            picture:picture,
            nome:nome,
            nameGame:nameGame,
            numEspectadore:numEspectadore
        });
    
    }


    return Streamers
    
}






router.get('/', async (req, res) => {
    try {
      const streamer = await GetTopStreamers();
      res.status(200).render('index', {streamer});
    } catch (e) {
      console.log('Error: ' + e);
      res.status(500).render('error', { message: 'Ocorreu um erro' });
    }
  });
  



async function SearchStreamer(nomeStreamer) {
    const response = await fetch(`${API_URL}/users?login=${nomeStreamer}`, options);
    const data = await response.json();
    return data;
}
  
router.get('/search', async (req, res) => {
    try{
        const nomeStreamer = req.query.nome;
        const response = await SearchStreamer(nomeStreamer);
        res.status(200).send(response);
    }catch(e){
        console.log('error ' + e);
    }
});
  
  
  


module.exports = router;