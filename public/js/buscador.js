// cerrar resultados
const cerrarBuscador = document.getElementById('cerrarBuscador')

const resultadoLamps = document.querySelector('.resultadoLamps');
const resultadoDiseniadores = document.querySelector('.resultadoDiseniadores');

cerrarBuscador.addEventListener('click', function () {
  resultadoLamps.style.display = 'none';
  resultadoDiseniadores.style.display = 'none';
});



// oculta img y cambia texto boton
function contenedorVisibleBuscador() {
  let resultadosOcultos = document.getElementById('resultadosOcultos');
  let btnBuscador = document.getElementById('btnBuscador')

  if (resultadosOcultos.classList.contains('resultadosVisibles')) {
    resultadosOcultos.classList.remove('resultadosVisibles');
    btnBuscador.textContent = 'ver más';
  } else {
    resultadosOcultos.classList.add('resultadosVisibles');
    btnBuscador.textContent = 'ver menos';
  }
}

async function keyUpSearch(event) {

  let value = document.getElementById('buscador').value


  if (event.key === 'Enter') {

    try {
      const url = `http://localhost:3050/products/search?name=${value}`;
      // Lo tomo por parametro para saber si esos datos coinciden con los datos de la base

      const response = await fetch(url);
      const data = await response.text();

      document.getElementById('resultadosLamps').innerHTML=data


      
    }

    catch (error) {
      console.log(error)
    }


  }


}