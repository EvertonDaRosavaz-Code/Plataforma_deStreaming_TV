const options = {
  headers : {
    Authorization: `Bearer `,
    'Client-Id': ``
  }
}


let conteinerDePlayers = document.getElementById('swiper-wrapper');
let players = [];

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
    
    arrayDeStreamers.forEach((elemento, indice)=>{
      let nameUser = elemento.user_name
      players.push(nameUser)
      conteinerDePlayers.innerHTML +=
       `
        <div data-hash="slide${indice + 1}" class="swiper-slide">
          <div id="twitch-embed${indice + 1}" class="conteinerPlayer">
            <div class="playerDescri">
              <div class="conteiner-imgPlayer">
                <img src="" alt="">
              </div>
              <div class="nameStreamerPlayer"> ${nameUser}</div>
              <div class="descriStreamerPlayer"></div>
            </div>
          </div>
        </div>
      `
    });



  }
}



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
      this.player2 ? this.player2.pause() : '';
      this.player3 ? this.player3.pause() : '';
      this.player4 ? this.player4.pause() : '';
      this.player5 ? this.player5.pause() : '';
    
     this.player1.play();
    }

    if(num == 2){
      this.player1 ? this.player1.pause() : '';
      this.player3 ? this.player3.pause() : '';
      this.player4 ? this.player4.pause() : '';
      this.player5 ? this.player5.pause() : '';

      this.player2.play();
    }

    if(num == 3){

      this.player1 ? this.player1.pause(): '';
      this.player2 ? this.player2.pause(): '';
      this.player4 ? this.player4.pause(): '';
      this.player5 ? this.player5.pause(): '';

      this.player3.play();
    }

    if(num == 4){
      this.player1 ? this.player1.pause() : '';
      this.player2 ? this.player2.pause() : '';
      this.player3 ? this.player3.pause() : '';
      this.player5 ? this.player5.pause() : '';

      this.player4.play();
    }


    if(num == 5){
      this.player1 ? this.player1.pause() : '';
      this.player2 ? this.player2.pause() : '';
      this.player3 ? this.player3.pause() : '';
      this.player4 ? this.player4.pause() : '';

      this.player5.play();
    }
  }


}


let controllerPlayer = new ControllerPlayer();

async function init() {
  await RunPlayerTwitch();

  if(controllerPlayer.createPlayerTwitch1 == false){
    controllerPlayer.PlayerTwitch1({width:450, height:850, channel:players[0]});
    controllerPlayer.createPlayerTwitch1 = true;
  }


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
        console.log('Está no Slide 1');
      },

       slideChange: function (){
         let activeSlideIndex = this.activeIndex;
         
         
         switch (activeSlideIndex + 1){
             case 1:
                controllerPlayer.PauseTwtch(1);
               break;
             case 2:
                if(controllerPlayer.createPlayerTwitch2 == false){
                  controllerPlayer.PlayerTwitch2({width:450, height:850, channel:players[1]});
                  controllerPlayer.createPlayerTwitch2 = true;
                }
                controllerPlayer.PauseTwtch(2);
               break
              case 3:
                if(controllerPlayer.createPlayerTwitch3 == false){
                  controllerPlayer.PlayerTwitch3({width:450, height:850, channel:players[2]});
                  controllerPlayer.createPlayerTwitch3  = true;
                }
                controllerPlayer.PauseTwtch(3);
                break
              case 4:
                if(controllerPlayer.createPlayerTwitch4 == false){
                  controllerPlayer.PlayerTwitch4({width:450, height:850, channel:players[3]});
                  controllerPlayer.createPlayerTwitch4  = true;
                }
                controllerPlayer.PauseTwtch(4);
                break
              case 5:
                if(controllerPlayer.createPlayerTwitch5 == false){
                  controllerPlayer.PlayerTwitch5({width:450, height:850, channel:players[4]});
                  controllerPlayer.createPlayerTwitch5  = true;
                }
                controllerPlayer.PauseTwtch(5);
         }
       }
     }
     
   });

}



init();

