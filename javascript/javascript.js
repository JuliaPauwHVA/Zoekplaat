const zoekAfbeelding = document.getElementById("zoekAfbeelding");
const zoekAfbeeldingImg = document.getElementById("zoekAfbeeldingImg");
const dierenLijst = document.querySelector(".dierenLijst");

// Object met dieren en de positie op de afbeelding in procenten. 
// found geeft aan of het dier al gevonden is. false = nog niet gevonden.
const dieren = {
    buidelmuis: { x: 49.5, y: 50, found: false },
    kikker: { x: 43, y: 93, found: false },
    leguaan: { x: 6.1, y: 75.9, found: false },
    olifant: { x: 62, y: 72, found: false },
    uil: { x: 5, y: 16, found: false },
    vleermuis: { x: 73, y: 4, found: false },
};

// Functie die een cirkel plaatst op de positie van een dier in de afbeelding.
// Markeert het dier als gevonden in de lijst.
function markeerDier(dierNaam, positieX, positieY) {
    // Haalt de afmetingen van de afbeelding op.
    const imgRect = zoekAfbeeldingImg.getBoundingClientRect();
    const x = (positieX / 100) * imgRect.width;
    const y = (positieY / 100) * imgRect.height;

    // Maak een rode cirkel op de juiste positie.
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
    const rodeCirkel = document.createElement("div");
    rodeCirkel.classList.add("rodeCirkel");
    rodeCirkel.style.left = `${x}px`;
    rodeCirkel.style.top = `${y}px`;
    zoekAfbeelding.appendChild(rodeCirkel);

    // Zoek het item in de lijst en markeert het als gevonden.
    const lijstItem = dierenLijst.querySelector(`[data-item="${dierNaam}"]`);
    if (lijstItem) lijstItem.classList.add("found");
}

// Functie die controleert of alle dieren gevonden zijn.
function controleerAlleDierenGevonden() {
    // Controleert of alle dieren de status found hebben.
    const allesGevonden = Object.values(dieren).every(dier => dier.found);

     // Als alle dieren gevonden zijn, komt er een melding.
    if (allesGevonden) {
        alert("Gefeliciteerd! Je hebt alle dieren gevonden! 🎉");
    }
}

// Voegt een klik-event toe aan de afbeelding om de zoeklocatie te bepalen
// https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
zoekAfbeeldingImg.addEventListener("click", (e) => {
    const rect = zoekAfbeeldingImg.getBoundingClientRect();
    // Berekent de klikpositie als percentage van de afbeelding
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Loopt door alle dieren en controleert of de klik dichtbij een niet gevonden dier is
    Object.entries(dieren).forEach(([naam, coord]) => {
        // Als het dier nog niet gevonden is en de klik binnen 3% van de coördinaten ligt
        if (!coord.found && Math.abs(clickX - coord.x) < 3 && Math.abs(clickY - coord.y) < 3) {
            // Markeert het dier als gevonden en updatet de status
            markeerDier(naam, coord.x, coord.y);
            dieren[naam].found = true;
        }
    });

    // Controleert of alle dieren zijn gevonden
    controleerAlleDierenGevonden();
});