//Variaveis globais
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

function removeLocalStorage(name){
  let getChave = localStorage.getItem('historic');
  let arrayItens = JSON.parse(getChave);
  let newArray = arrayItens.filter(elemento => elemento !== name);

  localStorage.setItem('historic', JSON.stringify(newArray))
  
}





let ItensLocalStorage = localStorage.getItem('historic');
let arrayItens        = JSON.parse(ItensLocalStorage)


function handleInputBlur() {
  conteinerStreamers.style.height = '0vh';
}

function handleMouseEnter() {
  input.removeEventListener('blur', handleInputBlur);
}

function handleMouseLeave() {
  input.addEventListener('blur', handleInputBlur);
}

input.addEventListener('focus', ()=>{
  if(localStorage.getItem('historic')){
    let getItem   = localStorage.getItem('historic')
    let arrayItem = JSON.parse(getItem);
    if(arrayItem.length == 0){
      handleInputBlur();
    }else{
      conteinerStreamers.style.height = '20vh'
    }
  }else{
    conteinerStreamers.style.height = '20vh'
  }
  
});


input.addEventListener('blur', handleInputBlur)


for (let i = 0; i < arrayItens.length; i++) {
  let item = arrayItens[i];
  let divDad = document.createElement('div');
    let a = document.createElement('a');
      let imgOnload = document.createElement('img');
      let span      = document.createElement('span');
    let divChild = document.createElement('div')
      let imgExclud = document.createElement('img');

  //classes
  divDad.setAttribute('class', 'divDad');
  a.setAttribute('class', 'link');
  divChild.setAttribute('class', 'divChild');

  a.href = `${item}`;
  span.textContent = item;
  imgOnload.src = '../svg/reload.svg';
  imgExclud.src = '../svg/cruz.svg';
  a.appendChild(imgOnload);
  a.appendChild(span);

  divChild.appendChild(imgExclud)

  divDad.appendChild(a);
  divDad.appendChild(divChild);



  //Eventos
  divDad.addEventListener('mouseenter',handleMouseEnter);
  divDad.addEventListener('mouseleave',handleMouseLeave);
  
  imgExclud.addEventListener('click', function(){
    removeLocalStorage(item);
    divDad.remove()
  });

  conteinerStreamers.appendChild(divDad)
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

