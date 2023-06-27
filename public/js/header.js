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


// cambio header
window.addEventListener('resize', function () {
    let header = document.getElementById('headerBg');
    let logo = document.getElementById('logo');
    let pantalla = window.innerWidth;
    let enlaces = document.querySelectorAll('#enlaces');
    let icons = document.querySelectorAll('.icon');

    if (pantalla > 900) {

        header.classList.remove("headerBg");
        logo.classList.remove("cambioTextoColor");
        enlaces.forEach(enlace => {
            enlace.classList.remove("cambioTextoColor");
        });
        icons.forEach(icon => {
            icon.classList.remove("open");
        });
    }
})

// hamburguesa

let icons = document.querySelectorAll('.icon');
let navLeft = document.getElementById('navLeft');
let logo = document.getElementById('logo')
let headerBg = document.getElementById('headerBg');
let enlaces = document.querySelectorAll('#enlaces')

navLeft.classList.remove("active");
icons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        icon.classList.toggle("open");
        navLeft.classList.toggle("active");
        logo.classList.toggle("cambioTextoColor");
        headerBg.classList.toggle("headerBg");
        enlaces.forEach(enlace => {
            enlace.classList.toggle("cambioTextoColor");
        });
    });
});


// se cierra nav responsive al clickear en links
navLeft.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        navLeft.classList.toggle("active");
    })
})