//Variaveis globais
let conteinerMenu                  = document.getElementById('menu-lateral');
let TitleHeader                    = document.getElementById('TitleHeader');
let conteiner_img                  = document.getElementById('conteiner-img');
let HeaderSeguindo                 = document.getElementById('headerSeguidos');
let conteinerDeListaStreamers      = document.getElementById('ListDeStreamer');

let TextBtnMostrarMais             = document.getElementById('TextBtnMostrarMais');

const streamers = [
    {name:'alanzoka', nameGame:'Zelda', Numlive:14953, picture:'../img/alan.png'},
    {name:'Jukes', nameGame:'League of Legends', Numlive:1200 ,   picture:'../img/jukes.png'},
    {name:'XANDAOOGOD', nameGame:'League of Legends', Numlive:200 ,   picture:'../img/XANDAOOGOD.png'}
];


function CreateElementStreamers(picture, name = '', nameGame = '', NumLive = ''){
   
    //Criar elementos
    let li =  document.createElement('li');
        let DivAvatarStreamer = document.createElement('div');
        let img  = document.createElement('img')
        let DivDescriStreamer = document.createElement('div');
            let spanNameStreamer  = document.createElement('span');
            let spanNameGameStreamer = document.createElement('span');
        let DivDescreLive = document.createElement('div');
            let DivBollRed = document.createElement('div');
            let spanNumLive = document.createElement('span');

    //DescriStreamer recebe como filhos name e nameGame
    DivDescriStreamer.appendChild(spanNameStreamer);
    DivDescriStreamer.appendChild(spanNameGameStreamer);

    //Descri Livre recebe como filhos Divbolinha e NumLive
    DivDescreLive.appendChild(DivBollRed);
    DivDescreLive.appendChild(spanNumLive);
    //DivAvatar recebe img
    DivAvatarStreamer.appendChild(img);
    //li recebe Div Avatar
    li.appendChild(DivAvatarStreamer);
    //li recebe os conteiners DivDescri e DivDescreLive
    li.appendChild(DivDescriStreamer);
    li.appendChild(DivDescreLive);


    /*Por suas respectivas classes para cada elemento para usar em CSS*/
    DivAvatarStreamer.className = 'conteinerAvatarStreamer';
    DivDescriStreamer.className = 'conteinerDescriStreamer';
        spanNameStreamer.className = 'spanNameStreamer';
        spanNameGameStreamer.className = 'spanNameGameStreamer';
    DivDescreLive.className = 'conteinerDescriive';
        DivBollRed.className = 'bolinhaLive';
        spanNumLive.className = 'numLive';

    /*Aqui ficaram os IDs*/
    spanNameGameStreamer.setAttribute('id', 'NameGameStreamer')
    spanNumLive.setAttribute('id', 'NumLive')
    DivDescriStreamer.setAttribute('id', 'conteinerDescriStreamer')
    DivDescreLive.setAttribute('id', 'conteinerDescriLive')
    
    /*Por valores em cada conteiner*/
    img.setAttribute('src', `${picture}`);
    spanNameStreamer.textContent = `${name}`;
    spanNameGameStreamer.textContent = `${nameGame}`;
    spanNumLive.textContent  = `${NumLive}`

    /*Condições*/ 
    if(NumLive > 999){
        let newNumLive = (NumLive/1000).toFixed(1).toLocaleString('pt-BR') + 'mil';
        spanNumLive.textContent = newNumLive
    }

    if(NumLive > 999999){
        let newNumLive = (NumLive/1000000).toFixed(1).toLocaleString('pt-BR') + 'M';
        spanNumLive.textContent = newNumLive
    }


    if(NumLive > 999999999){
        let newNumLive = (NumLive/1000000000).toFixed(1).toLocaleString('pt-BR') + 'B';
        spanNumLive.textContent = newNumLive
    }
    //Fazer o retorno de toda essa estrutura;
   
   conteinerDeListaStreamers.appendChild(li)
}

for(let dates of streamers){
     CreateElementStreamers(dates.picture, dates.name, dates.nameGame, dates.Numlive );
}



// Está função é a que vai diminuir e aumentar o menu
document.getElementById('conteiner-img').onclick = ()=>{
    let conteinerDescriStreamer = document.getElementById('conteinerDescriStreamer');
    let conteinerDescriLive     = document.getElementById('conteinerDescriLive');             
    conteinerMenu.classList.toggle('diminuir');
   
   if(!conteinerMenu.classList.contains('diminuir')){
    //Aqui ir aumentar
    conteiner_img.innerHTML = 
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">'+
    '<path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"/>'+
    '</svg>';
    TitleHeader.style.display = 'flex';
    HeaderSeguindo.style.display = 'flex';
   
    TextBtnMostrarMais.style.display = 'flex'
   }else{
    // Aqui ira diminuir
    conteiner_img.style.marginTop = '5px'
    
    conteinerMenu.style.transition = '.5s ease';
    conteiner_img.innerHTML = 
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">'+
    '<path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"/>'+
    '</svg>';
    TitleHeader.style.display = 'none';
    HeaderSeguindo.style.display = 'none';
  
    TextBtnMostrarMais.style.display = 'none'
   }
}






//Configurar nomes da barra de menu que ultrapassam 15 caracteres
let nameGame = document.getElementById('NameGameStreamer');
let maxLenght = 15;

if(nameGame.innerHTML.length > maxLenght ){
    nameGame.innerHTML = nameGame.innerHTML.substring(0, maxLenght) + '...'
}
