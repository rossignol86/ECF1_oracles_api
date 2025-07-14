const select = document.getElementById("signe");
const resultDiv = document.getElementById("resultat-horoscope");

let horoscopeData = null; // Stockage en cache pour éviter plusieurs appels

const aujourdHui = new Date();
const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const dateFormatee = aujourdHui.toLocaleDateString('fr-FR', options);

document.getElementById("date-jour").textContent = "  " + dateFormatee;

// Tableau des fonds d'écran par signe
const backgroundImages = {
    "Bélier": "url('assets/images/signes/belier.jpg')",
    "Taureau": "url('assets/images/signes/taureau.jpg')",
    "Gémeaux": "url('assets/images/signes/gemeaux.jpg')",
    "Cancer": "url('assets/images/signes/cancer.jpg')",
    "Lion": "url('assets/images/signes/lion.jpg')",
    "Vierge": "url('assets/images/signes/vierge.jpeg')",
    "Balance": "url('assets/images/signes//balance.jpg')",
    "Scorpion": "url('assets/images/signes/scorpion.jpg')",
    "Sagittaire": "url('assets/images/signes/sagitaire.jpg')",
    "Capricorne": "url('assets/images/signes/capricorne.jpg')",
    "Verseau": "url('assets/images/signes/verseau.jpg')",
    "Poissons": "url('assets/images/signes/poissons.jpg')"
};

select.addEventListener("change", () => {
    const selectedSign = select.value;

    if (!selectedSign) {
        resultDiv.innerHTML = "";
        document.body.style.backgroundImage = ""; // Retire le fond si aucun signe sélectionné
        return;
    }

    if (horoscopeData) {
        afficherHoroscope(selectedSign);
    } else {
        fetch("https://oracles-api.sidathsoeun.fr/oracle_api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                api_key: "SI_DART_Sun_api_keys_!598254741369!excalibure!paramKeysOracle!887782secretNum&5882!"
            })
        })
        .then(res => res.json())
        .then(data => {
            if (!data || data.error || !data.horoscope) {
                resultDiv.innerHTML = `<p>Erreur lors de la récupération de l’horoscope.</p>`;
                return;
            }
            horoscopeData = data.horoscope;
            afficherHoroscope(selectedSign);
        })
        .catch(err => {
            resultDiv.innerHTML = `<p>Erreur de connexion : ${err.message}</p>`;
        });
    }
});

function afficherHoroscope(signe) {
    // Changer l'image de fond
    const backgroundUrl = backgroundImages[signe];
    if (backgroundUrl) {
        document.body.style.backgroundImage = backgroundUrl;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    }

    const message = horoscopeData[signe];

    const emoji = {
        "Bélier": "♈️", "Taureau": "♉️", "Gémeaux": "♊️", "Cancer": "♋️",
        "Lion": "♌️", "Vierge": "♍️", "Balance": "♎️", "Scorpion": "♏️",
        "Sagittaire": "♐️", "Capricorne": "♑️", "Verseau": "♒️", "Poissons": "♓️"
    }[signe];

    resultDiv.innerHTML = `
        <div class="card">
            <h2>${emoji} ${signe}</h2>
            <p>${message}</p>
        </div>
    `;
}
