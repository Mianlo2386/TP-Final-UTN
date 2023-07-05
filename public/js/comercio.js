const grillaButton = document.getElementById('grilla');
const listaButton = document.getElementById('lista');
const productosContainer = document.getElementById('productosContainer');

grillaButton.addEventListener('click', function() {
  productosContainer.classList.remove('lista');
  productosContainer.classList.add('grilla');
});

listaButton.addEventListener('click', function() {
  productosContainer.classList.remove('grilla');
  productosContainer.classList.add('lista');
});
