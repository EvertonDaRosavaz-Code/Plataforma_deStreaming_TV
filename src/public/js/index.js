let conteinerStreamers  = document.getElementById('conteinerStreamers');
let input               = document.getElementById('ValueInput')


const datesStreaming = [
    {name:'Jukes',        picture:'img/jukes.png',        cheked:true},
    {name:'Yoda',         picture:'img/Yoda.png',         cheked:false},
    {name:'XANDAOGOOD',   picture:'img/XANDAOOGOD.png',   cheked:true},
    {name:'ervadraminha', picture:'img/ervadraminha.png', cheked:false},
    {name:'esportstvzan1',picture:'img/esportstvzan1.png',cheked:true},
    {name: 'Jukeyz',      picture:'img/Jukeyz.png',       cheked:true},
    {name: 'alanzoka',     picture: 'img/alan.png',       cheked:true}
];
   

function createElements(streamers) {
    const content = streamers.map(streamer => `
    <a href = ${'#'} class = 'divMain'>
    <div class= 'divIMG'>
        <img src= ${streamer.picture}>
    </div>

        <span class = 'nameStreaming' >
            ${streamer.name}
            <div class = 'conteinerChecked'>
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="checked" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                <g class="style-scope yt-icon"><path d="M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M9.8,17.3l-4.2-4.1L7,11.8l2.8,2.7L17,7.4 l1.4,1.4L9.8,17.3z" class="style-scope yt-icon"></path></g>
                </svg>
            </div>
        </span>
    </a>
    `).join('');
    
    conteinerStreamers.innerHTML = content;
}



function searchElements(searchValue) {
    const filteredStreamers = datesStreaming.filter(streamer => streamer.name.toLowerCase().includes(searchValue.toLowerCase()));
    createElements(filteredStreamers);
}

createElements(datesStreaming);


input.addEventListener('input', event => {
    if(input.value !== ''){
        searchElements(event.target.value);
        conteinerStreamers.style.height = '40vh'
    }else{
        conteinerStreamers.style.height = '0vh'

    }
});




