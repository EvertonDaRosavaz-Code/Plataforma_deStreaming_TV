const options = {
  headers : {
    Authorization: `Bearer pqlbi0btqoxj9qrqo09f8k9qex7en4`,
    'Client-Id': `mo9ref2fe7vxqzhd9f35fmo1uor3jv`
  }
}





let conteinerDePlayers = document.getElementById('swiper-wrapper');

let players     = [];
let nameGame    = [];
let descriGame  = [];
let picture     = [];

async function RunPlayerTwitch() {
  const url = "https://api.twitch.tv/helix/streams?sort=viewers&language=pt";
  
  const response = await fetch(url, options);
  const data = await response.json();


  if (data && Array.isArray(data['data'])) {
    //Filtrar apenas streamers com com not mature
    let arrayNotMature = data['data'].filter((element)=>{
      return element.is_mature === false
    });

   let arrayDeStreamers = arrayNotMature.slice(0, 5);
  
    arrayDeStreamers.forEach((elemento)=>{
      let nameUser = elemento.user_name;
      let name_game = elemento.game_name;
      players.push(nameUser);
      nameGame.push(name_game);
    });


  }

 for(let dados of players){
  const response =  await fetch(`https://api.twitch.tv/helix/users?login=${dados}`, options);
  const data = await response.json();

  descriGame.push(data['data'][0].description);
  picture.push(data['data'][0].profile_image_url)
 
 }
 let maxCarracter = 180
 let newArrayDescri = descriGame.map((elemento)=>{
    if(elemento.length > maxCarracter){
      let newDescri = elemento.substring(0, maxCarracter)  + '...'
      elemento = newDescri
    }

    return elemento
 })

 for(let i = 0; i < 4; i++){
  conteinerDePlayers.innerHTML += 
  `
    <div data-hash="slide${i + 1}" class="swiper-slide">
    <div class="load" id="load">	
      <div class="c-loader"></div>
    </div>
      <div id="twitch-embed${i + 1}" class="conteinerPlayer">
        <div class="playerDescri">
        <div class = "conteinerStreamerPlayer">
            <div class="conteiner-imgPlayer">
              <img src="${picture[i]}" alt="picture-streamer">
            </div>
          </div>
          <div class="descriStreamerPlayer">
            <span> ${newArrayDescri[i]} </span>
          </div>
          <div class="nameGamePlayer">
            <span> ${nameGame[i]} </span>
          </div>
          <div class="nameStreamerPlayer">
            <span>${players[i]}</span>
          </div>
        </div>
      </div>
    </div>
  `
 }
}


const Arraycores = [
  "#FF5252", "#FF4081", "#E040FB", "#7C4DFF", "#536DFE", "#448AFF", "#40C4FF", "#18FFFF", "#64FFDA", "#69F0AE",
  "#B2FF59", "#EEFF41", "#FFFF00", "#FFD740", "#FFAB40", "#FF6E40", "#FF1744", "#D50000", "#F44336", "#E91E63",
  "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39",
  "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B", "#8C9EFF", "#9FA8DA", "#A5D6A7",
  "#C5E1A5", "#E6EE9C", "#FFF59D", "#FFE082", "#FFCC80", "#FFAB91", "#BCAAA4", "#EEEEEE", "#BDBDBD", "#78909C"
];



class ControllerPlayer {
  

  constructor () {
    this.player1 = null;
    this.player2 = null;
    this.player3 = null;
    this.player4 = null;
    this.player5 = null;

    this.createPlayerTwitch1 = false;
    this.createPlayerTwitch2 = false;
    this.createPlayerTwitch3 = false;
    this.createPlayerTwitch4 = false;
    this.createPlayerTwitch5 = false;
  }

  PlayerTwitch1 (options) {
    this.player1 = new Twitch.Player(`twitch-embed1`, options);
  }

  PlayerTwitch2 (options) {
   this.player2 = new Twitch.Player(`twitch-embed2`, options);
  }

  PlayerTwitch3 (options){
    this.player3 = new Twitch.Player(`twitch-embed3`, options);
  }

  PlayerTwitch4 (options){
    this.player4 = new Twitch.Player(`twitch-embed4`, options);  
  }

  PlayerTwitch5 (options) {
    this.player5 = new Twitch.Player(`twitch-embed5`, options);
  }


  PauseTwtch (num) {
    if(num == 1){
      this.player2 ? this.player2.pause() : void 0;
      this.player3 ? this.player3.pause() : void 0;
      this.player4 ? this.player4.pause() : void 0;
      this.player5 ? this.player5.pause() : void 0;
    
     this.player1.play();
    }

    if(num == 2){
      this.player1 ? this.player1.pause() : void 0;
      this.player3 ? this.player3.pause() : void 0;
      this.player4 ? this.player4.pause() : void 0;
      this.player5 ? this.player5.pause() : void 0;

      this.player2.play();
    }

    if(num == 3){

      this.player1 ? this.player1.pause(): void 0;
      this.player2 ? this.player2.pause(): void 0;
      this.player4 ? this.player4.pause(): void 0;
      this.player5 ? this.player5.pause(): void 0;

      this.player3.play();
    }

    if(num == 4){
      this.player1 ? this.player1.pause() : void 0;
      this.player2 ? this.player2.pause() : void 0;
      this.player3 ? this.player3.pause() : void 0;
      this.player5 ? this.player5.pause() : void 0;

      this.player4.play();
    }


    if(num == 5){
      this.player1 ? this.player1.pause() : void 0;
      this.player2 ? this.player2.pause() : void 0;
      this.player3 ? this.player3.pause() : void 0;
      this.player4 ? this.player4.pause() : void 0;

      this.player5.play();
    }
  }


}


let controllerPlayer = new ControllerPlayer();

let arrayColorForConteinerIMG = [];
async function init() {
  await RunPlayerTwitch();

  let load = document.querySelectorAll('#load')

  for(let i = 0; i < 4; i++){
    let random = Math.floor(Math.random() * Arraycores.length);
    arrayColorForConteinerIMG.push(Arraycores[random]);
  }

  let conteinrIMGPlayer = document.querySelectorAll('.conteiner-imgPlayer');

  conteinrIMGPlayer.forEach((elemento, indice)=>{
    elemento.style.border = `solid ${arrayColorForConteinerIMG[indice]} 2px`
  })

  conteinrIMGPlayer.forEach((elemento, indice)=>{
    elemento.addEventListener('mouseover', ()=>{
      elemento.style.border = `solid ${arrayColorForConteinerIMG[indice]} 5px`
    });

    elemento.addEventListener('mouseout', ()=>{
      elemento.style.border = `solid ${arrayColorForConteinerIMG[indice]} 2px`
    })
  })




  new Swiper(".mySwiper", {

     hashNavigation: {
       watchState: true,
     },

     pagination: {
       el: ".swiper-pagination",
       clickable: true,
     },

     navigation: {
       nextEl: ".swiper-button-next",
       prevEl: ".swiper-button-prev",
     },
   


     on:{
      init: function () {

        if(controllerPlayer.createPlayerTwitch1 == false){
          controllerPlayer.PlayerTwitch1({width:450, height:850, channel:players[0]});
          controllerPlayer.createPlayerTwitch1 = true;

          controllerPlayer.player1.addEventListener(Twitch.Player.READY, ()=>{
            console.log('Carregado player 1');
            load[0].style.display = 'none'
          });

        } 
      },

       slideChange:  function () {
         let activeSlideIndex = this.activeIndex;

         switch (activeSlideIndex + 1){
             case 1:
                controllerPlayer.PauseTwtch(1);
               break;
             case 2:
                if(controllerPlayer.createPlayerTwitch2 == false){
                  controllerPlayer.PlayerTwitch2({width:450, height:850, channel:players[1], layout:'video'});
                  controllerPlayer.createPlayerTwitch2 = true;

                  controllerPlayer.player2.addEventListener(Twitch.Player.READY, ()=>{
                    console.log('Carregado player 1');
                    load[1].style.display = 'none'
                  });

                }
                controllerPlayer.PauseTwtch(2);
               break
              case 3:
                if(controllerPlayer.createPlayerTwitch3 == false){
                  controllerPlayer.PlayerTwitch3({width:450, height:850, channel:players[2]});
                  controllerPlayer.createPlayerTwitch3  = true;

                  controllerPlayer.player3.addEventListener(Twitch.Player.READY, ()=>{
                    console.log('Carregado player 1');
                    load[2].style.display = 'none'
                  });


                }
                controllerPlayer.PauseTwtch(3);
                break
              case 4:
                if(controllerPlayer.createPlayerTwitch4 == false){
                  controllerPlayer.PlayerTwitch4({width:450, height:850, channel:players[3]});
                  controllerPlayer.createPlayerTwitch4  = true;

                  controllerPlayer.player4.addEventListener(Twitch.Player.READY, ()=>{
                    console.log('Carregado player 1');
                    load[3].style.display = 'none'
                  });

                }
                controllerPlayer.PauseTwtch(4);
                break
              case 5:
                if(controllerPlayer.createPlayerTwitch5 == false){
                  controllerPlayer.PlayerTwitch5({width:450, height:850, channel:players[4]});
                  controllerPlayer.createPlayerTwitch5  = true;

                  controllerPlayer.player5.addEventListener(Twitch.Player.READY, ()=>{
                    console.log('Carregado player 1');
                    load[4].style.display = 'none'
                  });


                }
                controllerPlayer.PauseTwtch(5);
         }
       }

       
     }
     
   });


}

init();


