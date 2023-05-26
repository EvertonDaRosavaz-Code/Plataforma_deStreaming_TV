// id twitch-players
// class box

const options = {
    headers: {
        Authorization: `Bearer `,
        'Client-Id' : ``
    }
}


let conteinerDePlayers = document.getElementById('swiper-wrapper');

let slide1 = document.getElementById('twitch-embed1');
let slide2 = document.getElementById('twitch-embed2');
let slide3 = document.getElementById('twitch-embed3');
let slide4 = document.getElementById('twitch-embed4');
let slide5 = document.getElementById('twitch-embed5');




let nameStreamers  = [];
async function GetTopNameStreamers(){
    const url = "https://api.twitch.tv/helix/streams?first=5&sort=viewers&language=pt";

    const response = await fetch(`${url}`, options);
    const data = await response.json();
    if(data && Array.isArray(data['data'])){

        for(let i = 0; i < data['data'].length; i++){
            let nameGame = data['data'][i].user_name;
            nameStreamers.push(nameGame);
        }
    }

   return nameStreamers
}


async function addSlide0(){
    let nomes = await GetTopNameStreamers();
    let nameStreamer =  nomes[0];
    
    console.log(nameStreamer);
    optionsPlayer={
        width: 800,
        height: 450,
        channel:nameStreamer
    }

    let player = new Twitch.Player("twitch-embed1", optionsPlayer);
    player.setVolume(0.5)

}
addSlide0()


async function addSlide1(){
    let nomes  = await GetTopNameStreamers();
    let nameStreamer = nomes[1];

    optionsPlayer={
        width: 800,
        height: 450,
        channel:nameStreamer
    }

    let player = new Twitch.Player("twitch-embed2", optionsPlayer);
    player.setVolume(0.5)

}

addSlide1()



