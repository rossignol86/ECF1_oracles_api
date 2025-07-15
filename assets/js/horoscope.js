document.addEventListener('DOMContentLoaded', () => {
  const aujourdHui = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateFormatee = aujourdHui.toLocaleDateString('fr-FR', options);
  document.getElementById("date-jour").textContent = " " + dateFormatee;

  const bouton = document.querySelector('#btn-tirer');
  bouton.addEventListener('click', () => {
    fetchHoroscope();
  });
});

function fetchHoroscope() {
  const apiKey = 'SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!';
  const url = 'https://oracles-api.sidathsoeun.fr/oracle_api.php';

  const body = { api_key: apiKey };

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (!response.ok) throw new Error(`Erreur HTTP : ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log('Réponse API :', data);
      if (data && data.horoscope && typeof data.horoscope === 'object') {
        displayCards(data.horoscope);
      } else {
        document.querySelector('#cartes-container').innerHTML =
          '<p>Aucun message reçu.</p>';
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête API :', error);
    });
}

function displayCards(horoscopeObj) {
  const container = document.getElementById('cartes-container');
  container.innerHTML = "";

  // ✅ Table de correspondance signe → image
  const images = {
    Bélier: 'assets/images/signes/belier.jpg',
    Taureau: 'assets/images/signes/taureau.jpg',
    Gémeaux: 'assets/images/signes/gemeaux.jpg',
    Cancer: 'assets/images/signes/cancer.jpg',
    Lion: 'assets/images/signes/lion.jpg',
    Vierge: 'assets/images/signes/vierge.jpeg',
    Balance: 'assets/images/signes/balance.jpg',
    Scorpion: 'assets/images/signes/scorpion.jpg',
    Sagittaire: 'assets/images/signes/sagitaire.jpg',
    Capricorne: 'assets/images/signes/capricorne.jpg',
    Verseau: 'assets/images/signes/verseau.jpg',
    Poissons: 'assets/images/signes/poisson.jpg'
  };

  for (const signe in horoscopeObj) {
    const message = horoscopeObj[signe];
    const imageUrl = images[signe] || 'assets/img/horoscope/default.jpg';

    const card = document.createElement('div');
    card.classList.add('carte');
    card.innerHTML = `
      <img src="${imageUrl}" alt="${signe}">
      <h3>${signe}</h3>
      <p>${message}</p>
    `;

    container.appendChild(card);
  }
}
