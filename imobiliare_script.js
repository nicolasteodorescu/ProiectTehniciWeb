// Stocăm imaginile pentru fiecare proprietate (inca nu am facut-o)
const propertyImages = {
  1: "imagine1.jpg",
  2: "imagine2.jpg",
  3: "imagine3.jpg",
  4: "imagine4.jpg",
  5: "imagine5.jpeg",
  6: "imagine6.jpg"
};

// Date detaliate pentru fiecare proprietate
var properties;
fetch('imobiliare_json.json')
  .then(response => response.json())
  .then(data => {
    properties = data;
  })

// ToggleDropDown
function toggleDropdown(header) {
  const content = header.nextElementSibling;
  const arrow = header.querySelector('.dropdown-arrow');

  content.classList.toggle('open');
  arrow.classList.toggle('open');
}
// Filtru pret
const filterButtons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.property-card');

filterButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Dezactiveaza butonul de "toate" pentru al activa pe cel selectat
    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');

    const filter = this.dataset.filter;

    /// Cost preturi
    cards.forEach(card => {
      const price = parseInt(card.dataset.price);

      if (filter === 'all') {
        card.style.display = 'block';
      } else if (filter === 'low' && price < 1000000) {
        card.style.display = 'block';
      } else if (filter === 'medium' && price >= 1000000 && price <= 2000000) {
        card.style.display = 'block';
      } else if (filter === 'high' && price > 2000000) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Afisare pagina de detalii
function showDetails(propertyId) {
  const property = properties[propertyId];

  document.getElementById('mainPage').classList.add('hidden');
  document.getElementById('detailsPage').classList.add('active');
  // titlul
  document.getElementById('detailsTitle').textContent = property["title"];
  document.getElementById('detailsPropTitle').textContent = property["title"];
  document.getElementById('detailsPropPrice').textContent = property["price"];

  // slideshow ( inca nu e gata )
  const imageContainer = document.getElementById('detailsImageContainer');
  imageContainer.innerHTML = `<img src="${propertyImages[propertyId]}" alt="imagine7">`;

  // informatiile principale
  const mainInfoContainer = document.getElementById('detailsMainInfo');
  mainInfoContainer.innerHTML = '';
  for (const [label, value] of Object.entries(property["mainInfo"])) {
    mainInfoContainer.innerHTML += `
            <div class="info-item">
                <div class="label">${label}</div>
                <div class="value">${value}</div>
            </div>
        `;
  }

  // facilitatile
  const facilitiesContainer = document.getElementById('detailsFacilities');
  facilitiesContainer.innerHTML = '';
  for (const [label, value] of Object.entries(property["facilities"])) {
    facilitiesContainer.innerHTML += `
            <div class="info-item">
                <div class="label">${label}</div>
                <div class="value">${value}</div>
            </div>
        `;
  }

  // descrierea
  document.getElementById('detailsDescription').textContent = property["description"];

  // Scroll la inceputul paginii
  window.scrollTo(0, 0);
}

// buton de ducere inapoi
function goBack() {
  document.getElementById('detailsPage').classList.remove('active');
  document.getElementById('mainPage').classList.remove('hidden');
  window.scrollTo(0, 0);
}