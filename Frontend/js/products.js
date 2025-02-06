// Kategorien von der API abrufen
function fetchCategories() {
    fetch('http://localhost:3000/categories')  // Hier den richtigen API-Endpunkt angeben
        .then(response => response.json())
        .then(data => {
            const categoryFilter = document.getElementById('categoryFilter');
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.textContent = category.name;
                categoryFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Fehler beim Abrufen der Kategorien:', error));
}

// Funktion, um Produkte abzurufen und anzuzeigen
function fetchProducts() {
    fetch('http://localhost:3000/entries')  // API-Endpunkt für Produkte
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => console.error('Fehler beim Abrufen der Produkte:', error));
}

// Produkte anzeigen
function displayProducts(products) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = '';  // Vorherige Produkte entfernen
    products.forEach(product => {
        const productHTML = `
      <div class="product" onclick="showProductDetail('${product.title}', '${product.price}', '${product.description}', '${product.bild_pfad}')">
        <img src="Images/${product.bild_pfad}" alt="Produktbild" class="product-image">
        <h3>${product.title}</h3>
        <p>Preis: ${product.price}€</p>
        <p>Beschreibung: ${product.description}</p>
      </div>
    `;
        productContainer.innerHTML += productHTML;
    });
}
