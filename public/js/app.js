// cambio logo
function cambiarNombreLogo() {
  let logo = document.getElementById('logo');
  let pantalla = window.innerWidth;

  if (pantalla < 500) {
      logo.querySelector('a').textContent = 'mommo';
      logo.querySelector('a').setAttribute('href', '/');
  } else {
      logo.querySelector('a').textContent = 'mommolights';
  }
}

window.addEventListener('resize', cambiarNombreLogo);
document.addEventListener('DOMContentLoaded', cambiarNombreLogo);

// cambio bakcground color segun direccion
if (window.location.pathname === '/diseniadores' ||
    window.location.pathname === '/carreras' ||
    window.location.pathname === '/contacto' ||
    window.location.pathname === '/carrito' ||
    window.location.pathname === '/buscador') {

    let header = document.getElementById('headerBg');
    let logo = document.getElementById('logo');
    let enlaces = document.querySelectorAll('.enlaces');
    let icons = document.querySelectorAll('.icon');
    
    header.style.backgroundColor = 'white';
    header.style.borderBottom = '2px solid #998';
    logo.classList.add('cambioTextoColor');
    enlaces.forEach(enlace =>{
        enlace.classList.add('cambioTextoColor')
    })

    icons.forEach (icon => { 
        icon.classList.add('cambioTextoColor') 
        icon.classList.add("open");
        icon.addEventListener('click', (event) => {
          navLeft.classList.toggle("active");
        });
      });
}

//ocultar el menu hamburguesa al ser redirigido
let navLeft = document.getElementById('navLeft');
navLeft.classList.remove("active")