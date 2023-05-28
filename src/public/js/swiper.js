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
  }


  PlayerTwitch1 (options) {
   this.player1 =  new Twitch.Player(`twitch-embed1`, options);
  

   return this.player1
  }

  PlayerTwitch2 (options) {
   this.player2  =   new Twitch.Player(`twitch-embed2`, options);    

  
   return this.player2;
  }

  PlayerTwitch3 (options){
    this.player3  =   new Twitch.Player(`twitch-embed3`, options);    
 
    return this.player3;
  }

  PauseTwtch (num) {
    if(num == 1){
      this.player2.pause()
      this.player3.pause()
    }
  }

}





let controllerPlayer = new ControllerPlayer();

async function init() {
  await RunPlayerTwitch();

    controllerPlayer.PlayerTwitch1({width:450, height:850, channel:players[0]});
    controllerPlayer.PlayerTwitch2({width:450, height:850, channel:players[1]});
    controllerPlayer.PlayerTwitch3({width:450, height:850, channel:players[3]});

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
     
        controllerPlayer.PauseTwtch(1)
      },

       slideChange: function (){
         let activeSlideIndex = this.activeIndex;
         
         
         switch (activeSlideIndex + 1){
             case 1:
                console.log('Está no Slide 1');
                controllerPlayer.PauseTwtch(1)
               break;
             case 2:
               console.log('Está no Slide 2');          
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





















