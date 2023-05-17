let input = document.getElementById('ValueInput');
let BtnSearch = document.getElementById('BtnSearch')

async function getData() {
    try {
      const response = await fetch('http://localhost:4001/');
      const { streamer } = await response.json();
      console.log(streamer);
      // Utilize os dados no front-end conforme necessário
    } catch (error) {
      console.log('Error: ' + error);
    }
}
  
  // Chame a função getData() para buscar os dados
  getData();
  


