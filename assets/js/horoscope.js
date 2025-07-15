document.addEventListener('DOMContentLoaded', () => {
  // Affichage de la date formatée en français dans l'élément #date-jour
  const aujourdHui = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const dateFormatee = aujourdHui.toLocaleDateString('fr-FR', options);
  document.getElementById("date-jour").textContent = " " + dateFormatee;

  // Sélection du bouton et ajout de l'événement click
  const btn = document.querySelector('#tonBouton');
  btn.addEventListener('click', () => {
    fetchHoroscope();
  });
});

function fetchHoroscope() {
  const apiKey = 'SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!';
  const url = 'https://oracles-api.sidathsoeun.fr/oracle_api.php';

  const body = {
    api_key: apiKey
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Réponse API:', data);
    document.querySelector('#resultat').textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
    console.error('Erreur lors de la requête API:', error);
  });
}
