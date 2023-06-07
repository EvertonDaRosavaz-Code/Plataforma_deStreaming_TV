//Variaveis globais
let conteinerMenu                  = document.getElementById('menu-lateral');
let TitleHeader                    = document.getElementById('TitleHeader');
let conteiner_img                  = document.getElementById('conteiner-img');
let HeaderSeguindo                 = document.getElementById('headerSeguidos');
let conteinerDeListaStreamers      = document.getElementById('ListDeStreamer');
let headerRecomendacoes            = document.getElementById('HeaderRecomendacoes');
let conteinerIfNotFallows          = document.getElementById('conteinerIfNotFallows')

window.addEventListener('load', function() {

  let localStorageMenu = this.localStorage.getItem('Menufechado');
  if(localStorageMenu === 'true'){
    if(!conteinerMenu.classList.contains('diminuir')){
        conteinerMenu.classList.toggle('diminuir');
        diminuir()
    }
  }
 
});



function diminuir (){
  conteiner_img.style.marginTop = '5px'  
  conteinerMenu.style.transition = '.5s ease';
  conteiner_img.innerHTML = 
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">'+
  '<path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"/>'+
  '</svg>';
  TitleHeader.style.display = 'none';
  HeaderSeguindo.style.display = 'none';
  headerRecomendacoes.style.display = 'none';
  conteinerIfNotFallows.style.display = 'none'
  conteinerDeListaStreamers.style.border = 'solid red'
  localStorage.setItem('Menufechado', true);
}

function aumentar (){
  conteiner_img.innerHTML = 
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-left" viewBox="0 0 16 16">'+
    '<path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"/>'+
    '</svg>';
    TitleHeader.style.display = 'flex';
    HeaderSeguindo.style.display = 'flex';
    headerRecomendacoes.style.display = 'flex';
    conteinerIfNotFallows.style.display = 'flex';

    localStorage.setItem('Menufechado', false);
}



// Está função é a que vai diminuir e aumentar o menu
document.getElementById('conteiner-img').onclick = ()=>{            
    conteinerMenu.classList.toggle('diminuir');
    //Se diminuir(que possui 75px) não existir
   if(!conteinerMenu.classList.contains('diminuir')){
    //Aqui ir aumentar
      aumentar();
   }else{
    // Aqui ira diminuir
    diminuir()
  }
}


