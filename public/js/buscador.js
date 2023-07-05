// cerrar resultados
const cerrarBuscador = document.getElementById('cerrarBuscador')

const resultadoLamps = document.querySelector('.resultadoLamps');
const resultadoDiseniadores = document.querySelector('.resultadoDiseniadores');

cerrarBuscador.addEventListener('click', function() {
  resultadoLamps.style.display = 'none';
  resultadoDiseniadores.style.display = 'none';
});



// oculta img y cambia texto boton
function contenedorVisibleBuscador (){
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