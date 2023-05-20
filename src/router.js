
const router = require('express').Router();

const options = {
    headers: {
        Authorization: "Bearer ",
        'Client-Id' : ''
    }
}

const API_URL =  "https://api.twitch.tv/helix";

let Streamers = [];

let picture;
let nome;
let nameGame;
let numEspectadore;

// Parametros da url
const queryParms = new URLSearchParams ({
    language: 'pt',
    first: 10,
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
        
        if(dateName && dateName.data && dateName.data.length > 0){
            picture   = dateName.data[0].profile_image_url;
            nome            = dates.user_name;
            nameGame        = dates.game_name;
            numEspectadore  = dates.viewer_count;
            
            //Congirurar os nomes que ultrapassam 10 caracteres, se for substituia metade da string por "..."
            if(nameGame.length > 15){
                let newString = nameGame.substring(0, 15)  + '...'
                nameGame = newString
            }
        }

      
       


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


async function SearchStreamer(nomeStreamer) {
    const response = await fetch(`${API_URL}/users?login=${nomeStreamer}`, options);
    const data = await response.json();
    return data;
}

//Pegar os top jogos mais jogados
let ObjGame = [];
const width = 160;
const height = 180;

async function GetTopGames (){

    const response = await fetch(`${API_URL}/games/top?first=7`, options)
    const date = await response.json();
   

    for(let dados of date.data){
       
        const imageUrl = dados.box_art_url;
        let nomegame = dados.name;

        const formatarimg = imageUrl.replace('{width}', width ).replace('{height}', height);
        const maxCharced = 15;

         if(nomegame.length > maxCharced){
            let newName =  nomegame.substring(0, 15)  + '...'
            nomegame = newName;
         }

        let id = dados.id
        const response = await fetch(`${API_URL}/streams?game_id=${id}`, options);
        const data = await response.json();
       

        let views = data.data.reduce((acumulador, num)=> {
            return acumulador + num.viewer_count
        },0);

        //console.log(views);
        if(views > 999){
            let newViews  = (views/1000).toFixed(1) + ' mil';
            views = newViews;
        }

        if(views > 999999){
            let newViews = (views/1000000).toFixed(1) + ' M';
            views = newViews
        }

        if(views > 999999999){
            let newViews = (views/1000000000).toFixed(1) + ' B';
            views = newViews
        }

        ObjGame.push({
            nome:nomegame,
            image:formatarimg,
            views:views
        });

    }

    return ObjGame
}


//Rotas
//Principal
router.get('/', async (req, res) => {
    try {
      const streamer = await GetTopStreamers();
      const TopGames = await GetTopGames();
      res.status(200).render('index', {streamer, TopGames});
    } catch (e) {
      console.log('Error: ' + e);
      res.status(500).render('error', { message: 'Ocorreu um erro' });
    }
});
  
router.get('/:name', (req, res)=>{
    
})



//Rota de pesquisa
router.get('/search', async (req, res) => {
    try{
        const nomeStreamer = req.query.nome;
        const response = await SearchStreamer(nomeStreamer);
        res.status(200).send(response);
    }catch(e){
        console.log('error ' + e);
    }
});
  

//Rota Diretorio
router.get('/directory', async (req, res)=>{
    try {
        const streamer = await GetTopStreamers();
        res.status(200).render('directory', {streamer});
      } catch (e) {
        console.log('Error: ' + e);
        res.status(500).render('error', { message: 'Ocorreu um erro' });
      }
});

  


// Pegar descrições de Games para a rota Directory
const key  = '';
const name = 'Valorant';

async function GetDescriGame () {
    const response  =   await fetch(`https://api.rawg.io/api/games?key=${key}&search=${name}`)
    const date = await response.json();

    let idGame = date['results'][0]['id'];
    const responseDescriGame = await fetch(`https://api.rawg.io/api/games/${idGame}?key=${key}`)
    const dateDescriGame = await responseDescriGame.json();

    //console.log(dateDescriGame);
}


GetDescriGame()


module.exports = router;