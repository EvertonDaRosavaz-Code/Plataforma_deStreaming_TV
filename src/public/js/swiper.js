const options = {
  headers : {
    Authorization: `Bearer `,
    'Client-Id': ``
  }
}

let BtnEntrar = document.getElementById('BtnEntrar')
let conteinerDePlayers = document.getElementById('swiper-wrapper');
let players = [];

async function RunPlayerTwitch() {
  const url = "https://api.twitch.tv/helix/streams?first=5&sort=viewers&language=pt";
  
  const response = await fetch(url, options);
  const data = await response.json();
  if (data && Array.isArray(data['data'])) {
    for (let i = 0; i < data['data'].length; i++) {
      let nameUser = data['data'][i].user_name;
      players.push(nameUser)
      conteinerDePlayers.innerHTML += `
        <div data-hash="slide${i + 1}" class="swiper-slide">
          <div id="twitch-embed${i + 1}" class="conteinerPlayer">
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
    }
  }
}

class ControllerPlayer {

  constructor () {
    this.player1 = null;
    this.player2 = null;
  }


  PlayerTwitch1 (options) {
   this.player1 =  new Twitch.Player(`twitch-embed1`, options);
   
  }

  PlayerTwitch2 (options) {
   this.player2  =   new Twitch.Player(`twitch-embed2`, options);    
  }


}










let controllerPlayer = new ControllerPlayer();

async function init() {
  await RunPlayerTwitch();
  console.log(players);
 

  controllerPlayer.PlayerTwitch1({width:800, height:450, channel:players[0]})
  controllerPlayer.PlayerTwitch2({width:800, height:450, channel:players[1]})  


  let swiper = new Swiper(".mySwiper", {

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
        if(controllerPlayer.player2){
          controllerPlayer.player2.pause();

        }
      },

       slideChange: function (){

         let activeSlideIndex = this.activeIndex;
         console.log(activeSlideIndex+1);

         switch (activeSlideIndex+1){
             case 1:
                console.log('Está no Slide 1');

                if(controllerPlayer.player2){
                    controllerPlayer.player2.pause();
                }
               break;
             case 2:
               console.log('Está no Slide 2');

               if(controllerPlayer.player2){
                controllerPlayer.player1.pause();
               }

               break
              case 3:
                console.log('Está no Slide 3');
                break
              case 4:
                console.log('Está no Slide 4');
                break
              case 5:
                console.log('Está no Slide 5');
         }
       }
     }
     
   });

}

init();





















