let BtnSearch           = document.getElementById('BtnSearch');
let conteinerStreamers  = document.getElementById('conteinerStreamers');
let TaskList            = document.getElementsByClassName('TaskList');
let input               = document.getElementById('ValueInput');

let historicStreamer = [];
function SetLocalHistoric(value){
 if(localStorage.getItem('historic')){
    let itens     = localStorage.getItem('historic');
    let myArray   = JSON.parse(itens);
    
    //Preencher a array com os itens do LocalStorage
    for(let i = 0; i < myArray.length; i++){
      historicStreamer.push(myArray[i])
    }
    
    if(!historicStreamer.includes(value)){
        historicStreamer.push(value)
    }

    localStorage.setItem('historic',JSON.stringify(historicStreamer))
  }
  else{
    historicStreamer.push(value)
    localStorage.setItem('historic', JSON.stringify(historicStreamer))
 }

}

let ItensLocalStorage = localStorage.getItem('historic');
let arrayItens        = JSON.parse(ItensLocalStorage)




function increase(){
  input.addEventListener('focus', () =>{
    conteinerStreamers.style.height = '20vh'
  });
}

function to_decrase(){
  input.addEventListener("blur", ()=>{
    conteinerStreamers.style.height = '0vh'
  });
}

increase();



for (let i = 0; i < arrayItens.length; i++) {
    let item = arrayItens[i];
    let div_1       = document.createElement('div');
    let div_2       = document.createElement('div');
    let link        = document.createElement('a');
    let span        = document.createElement('span');
    let img_exclud  = document.createElement('img');
    let img_Reload  = document.createElement('img');
    
    //Classes
    div_1.setAttribute('class', 'div_1')
    div_2.setAttribute('class', 'div_2')


    img_Reload.src = '../svg/reload.svg';
    img_Reload.alt = 'Reload';
    span.textContent = item;

    div_1.appendChild(img_Reload);
    div_1.appendChild(span);


    img_exclud.src  = '../svg/cruz.svg'
    img_exclud.alt  = 'cruz'
    div_2.appendChild(img_exclud);

    link.addEventListener('click', function() {
      window.location.href = `http://localhost:4001/${item}`;
      to_decrase();
    });

    link.appendChild(div_1);
    link.appendChild(div_2);


    conteinerStreamers.appendChild(link)
}
  

function BuscarStreamer(name) {
  SetLocalHistoric(name)
  
  
  let currentUrl = window.location.href;
  let streamerName = name

  // Atualiza a URL com o novo nome do streamer
  let newUrl = currentUrl.replace(/\/([^\/]*)$/, `/${streamerName}`);
  window.location.href = newUrl;

  if (streamerName) {
    // console.log("A variável tem valor");
  } else {
    // console.log("A variável está sem valor");
  }
}



BtnSearch.onclick = () =>{
  BuscarStreamer(input.value)
}

