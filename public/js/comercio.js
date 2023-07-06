// cambio titulo segun click filtro
const dropdownLink = document.getElementById('dropdownLink');
const dropdownOptions = document.querySelectorAll('.dropdown-menu .dropdown-item');

dropdownOptions.forEach(option => {
  option.addEventListener('click', function () {
    const selectedOptionText = this.innerText;
    dropdownLink.innerHTML = selectedOptionText;
  });
});



// diseño segun click icono
const grillaButton = document.getElementById('grilla');
const listaButton = document.getElementById('lista');
const productosContainer = document.getElementById('productosContainer');

grillaButton.addEventListener('click', function () {
  productosContainer.classList.remove('lista');
  productosContainer.classList.add('grilla');
});

listaButton.addEventListener('click', function () {
  productosContainer.classList.remove('grilla');
  productosContainer.classList.add('lista');
});
