
const router = require('express').Router();
const axios  = require('axios');
const options = {
    headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Client-Id' : process.env.CLIENT_ID
    }
}

let numStreamers = 6
const API_URL = 'https://api.twitch.tv/helix';
let Streamers = [];

let picture;
let nome;
let nameGame;
let numEspectadore;

//Buscar Streamers mais vistos ao vivos e enviar ao index
async function GetTopStreamers () {
    Streamers = []
    //Parametros da chamada API com no maximo 5 streamers mais visto agora
    const queryParms = new URLSearchParams ({
        language: 'pt',
        first: numStreamers,
        sort: 'viewers'
    }).toString()

    const url = `${API_URL}/streams?${queryParms}`;
    const response = await axios.get(url, options);
    const data = await response.json();
    
  
    
    for(let date of data.data){
        const id = date.user_id;

        const userUrl = `https://api.twitch.tv/helix/users?id=${id}`;
        const streamUrl = `https://api.twitch.tv/helix/streams?user_login=${date.user_login}`;


        await axios.get(userUrl, options).then((response)=> response.json().then((dados)=> {
            picture = dados['data'][0]. profile_image_url;
            nome = dados['data'][0].display_name;
        }));

        await axios.get(streamUrl, options).then((response) => response.json().then((dados) => {
            nameGame = dados['data'][0].game_name;
            numEspectadore = dados['data'][0].viewer_count;
            
            if(numEspectadore > 999){
                let newNumLive = (numEspectadore/1000).toFixed(1).toLocaleString('pt-BR') + 'mil';
                numEspectadore = newNumLive
            }
            if(numEspectadore> 999999){
                let newNumLive = (numEspectadore/1000000).toFixed(1).toLocaleString('pt-BR') + 'M';
                spanNumLive.textContent = newNumLive
            }
        
        
            if(numEspectadore > 999999999){
                let newNumLive = (numEspectadore/1000000000).toFixed(1).toLocaleString('pt-BR') + 'B';
                spanNumLive.textContent = newNumLive
            }


        }));
    
        //Construir objeto para enviar ao Front
        Streamers.push({
            nome: nome,
            picture: picture,
            nameGame:nameGame,
            numEspectadore:numEspectadore
        });
        
    }

    return Streamers;
   
    
}


router.get('/', async (req ,res)=>{
   try{
    const streamer = await GetTopStreamers();
    res.status(200).render('index', {streamer});
   }catch(e){
        // Renederizar para uma pagina de erro
        console.log('Error ' + e);
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