
const express = require('express');
const router = express.Router();
const options = {
    headers: {
        Authorization: `Bearer `,
        'Client-Id' : ``
    }
}



const API_URL =  "https://api.twitch.tv/helix";

let Streamers = [];

let picture;
let nome;
let nameGame;
let numEspectadore;
let thumbnail_url;
let title;
let widthThub = 440
let heghtThub = 248

//Funções:
//Buscar Streamers mais vistos ao vivos e enviar ao index
async function GetTopStreamers () {
    

    let url = `https://api.twitch.tv/helix/streams?language=pt&first=10&sort=viewers}`
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
            title           = dates.title;
            thumbnail_url   = dates.thumbnail_url.replace('{width}', widthThub).replace('{height}', heghtThub);
            

            if(title.length > 60){
                let newString = title.substring(0, 60) + '...';
                title  = newString
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
            numEspectadore:numEspectadore,
            title:title,
            thumbnail_url:thumbnail_url
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

//Buscar jogos mais jogados
async function GetTopGames (){

    const response = await fetch(`${API_URL}/games/top?first=6`, options)
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



 
async function getLives(game){
    let width = 300;
    let height = 300;
    let PlayerStreamer = [];
    const url  = await fetch(`${API_URL}/games?name=${game}`, options);
    const response = await url.json();

    let getId = response['data'][0].id
    
    const url_2 = await fetch(`${API_URL}/streams?game_id=${getId}`, options);
    const response2 = await url_2.json();

    if(Array.isArray(response2['data'])){
        for(let data of response2['data']){
            let thumbnail_url = data.thumbnail_url.replace('{width}', width).replace('{height}', height);
            let nomeLive = data.title;
            let nameStreamer  = data.user_name;
            let name_game = data.game_name;

            PlayerStreamer.push({
                thumbnail_url:thumbnail_url,
                nomeLive:nomeLive,
                nameStreamer:nameStreamer,
                name_game:name_game
            })
        }

        return PlayerStreamer;
    }
}



//############################
//Rotas:
//Principal
router.get('/', async (req, res) => {
    try {
      const streamer = await GetTopStreamers();
      const TopGames = await GetTopGames();
      res.status(200).render('index', {
        streamer,
        TopGames
    });
    } catch (e) {
      //console.log('Error: ' + e);
      res.status(500).render('error', { message: 'Ocorreu um erro' });
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
  
router.get('/directory/game/:namegame', async (req, res)=> {
    let nameGame = req.params.namegame;
    const streamer = await GetTopStreamers();
    const getLive = await getLives(nameGame);
    try {
        //res.status(200).render('layoutGames', {streamer});
       
    } catch (e) {
        //res.status(500).render('error', { message: 'Ocorreu um erro' });
    }
});

router.get('/:name', async (req, res)=>{
    try {
        const streamer = await GetTopStreamers();
        const TopGames = await GetTopGames();
        res.status(200).render('layoutStreamer', {
          streamer,
      });
      } catch (e) {
        //console.log('Error: ' + e);
        res.status(500).render('error', { message: 'Ocorreu um erro' });
      }
});


module.exports = router;