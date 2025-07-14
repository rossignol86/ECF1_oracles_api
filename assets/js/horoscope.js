const select = document.getElementById("signe");
const resultDiv = document.getElementById("resultat-horoscope");

let horoscopeData = null; // Stockage en cache pour éviter plusieurs appels

select.addEventListener("change", () => {
    const selectedSign = select.value;

    if (!selectedSign) {
        resultDiv.innerHTML = "";
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


    // const images = {
    //     "Bélier": "../images/belier.jpg",
    //     "Taureau": "../images/taureau.jpg",
    //     "Gémeaux": "../images/gemeaux.jpg",
    //     "Cancer": "../images/cancer.jpg",
    //     "Lion": "../images/lion.jpg",
    //     "Vierge": "../images/vierge.jpeg",
    //     "Balance": "../images/balance.jpg",
    //     "Scorpion": "../images/scorpion.jpg",
    //     "Sagittaire": "../images/sagitaire.jpg",
    //     "Capricorne": "../images/capricorne.jpg",
    //     "Verseau": "../images/verseau.jpg",
    //     "Poissons": "../images/poisson.jpg"
    // };

    // const imageSrc = images[signe];
 //<img src="${imageSrc}" alt="${signe}" class="signe-image" />