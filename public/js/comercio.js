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

// range precio

function slideOne() {
  const sliderValue = document.getElementById("slider-1").value;
  document.getElementById("inputMin").value = sliderValue;
}

function slideTwo() {
  const sliderValue = document.getElementById("slider-2").value;
  document.getElementById("inputMax").value = sliderValue;
}

document.getElementById("inputMin").addEventListener("input", function() {
  const inputValue = document.getElementById("inputMin").value;
  document.getElementById("slider-1").value = inputValue;
});

document.getElementById("inputMax").addEventListener("input", function() {
  const inputValue = document.getElementById("inputMax").value;
  document.getElementById("slider-2").value = inputValue;
});




