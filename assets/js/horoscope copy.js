document.addEventListener('DOMContentLoaded', () => {
  const aujourdHui = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateFormatee = aujourdHui.toLocaleDateString('fr-FR', options);
  document.getElementById("date-jour").textContent = " " + dateFormatee;

  const bouton = document.querySelector('#btn-tirer');
  bouton.addEventListener('click', () => {
    // ✨ Masquer l'intro avec effet fondu
    const intro = document.getElementById("intro-container");
    if (intro) {
      intro.classList.add("fade-out");
      setTimeout(() => {
        intro.style.display = "none";
      }, 500); // doit correspondre à la durée du CSS
    }

    showLoader();
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
      document.querySelector('#cartes-container').innerHTML =
        '<p>Erreur lors du chargement. Veuillez réessayer.</p>';
    })
    .finally(() => {
      hideLoader();
    });
}

function displayCards(horoscopeObj) {
  const container = document.getElementById('cartes-container');
  container.innerHTML = "";

  const images = {
    Bélier: 'assets/images/signes/belier.webp',
    Taureau: 'assets/images/signes/taureau.webp',
    Gémeaux: 'assets/images/signes/gemeaux.webp',
    Cancer: 'assets/images/signes/cancer.webp',
    Lion: 'assets/images/signes/lion.webp',
    Vierge: 'assets/images/signes/vierge.webp',
    Balance: 'assets/images/signes/balance.webp',
    Scorpion: 'assets/images/signes/scorpion.webp',
    Sagittaire: 'assets/images/signes/sagitaire.webp',
    Capricorne: 'assets/images/signes/capricorne.webp',
    Verseau: 'assets/images/signes/verseau.webp',
    Poissons: 'assets/images/signes/poisson.webp'
  };

  for (const signe in horoscopeObj) {
    const message = horoscopeObj[signe];
    const imageUrl = images[signe] || 'assets/img/horoscope/zodiaque.webp';

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

function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "flex";
    loader.style.opacity = "1";
    loader.style.pointerEvents = "auto";
  }
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
}
