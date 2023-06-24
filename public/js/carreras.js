// oculta img y cambia texto boton
function contenedorVisible (){
    let contenedorOculto = document.getElementById('contenedorOculto');
    let btnCarreras = document.getElementById('btnCarreras')

    if (contenedorOculto.classList.contains('visible')) {
        contenedorOculto.classList.remove('visible');
        btnCarreras.textContent = 'ver más';
      } else {
        contenedorOculto.classList.add('visible');
        btnCarreras.textContent = 'ver menos';
      }
}