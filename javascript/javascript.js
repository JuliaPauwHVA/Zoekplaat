// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

document.addEventListener("DOMContentLoaded", () => {
    const zoekplaat = document.getElementById("zoekplaat");
    const zoekplaatImg = document.getElementById("zoekplaat-img");
    const itemList = document.querySelector(".item-lijst");

    // Object met zoekitems en coördinaten in %
    const items = {
        buidelmuis: { x: 49.5, y: 50, found: false },
        kikker: { x: 43, y: 93, found: false },
        leguaan: { x: 6.1, y: 75.9, found: false },
        olifant: { x: 62, y: 72, found: false },
        uil: { x: 5, y: 16, found: false },
        vleermuis: { x: 73, y: 4, found: false },
    };

    // Klikken voor de zoekplaat
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    zoekplaatImg.addEventListener("click", (e) => {
        const rect = zoekplaatImg.getBoundingClientRect();
        const clickX = ((e.clientX - rect.left) / rect.width) * 100;
        const clickY = ((e.clientY - rect.top) / rect.height) * 100;

        Object.entries(items).forEach(([key, coord]) => {
            if (!coord.found && Math.abs(clickX - coord.x) < 3 && Math.abs(clickY - coord.y) < 3) { // 3% marge
                markItem(key, coord.x, coord.y);
                items[key].found = true; // Markeer als gevonden
            }
        });

    });

    function markItem(itemKey, percentX, percentY) {
        // Coördinaten omgezet naar pixels
        const imgRect = zoekplaatImg.getBoundingClientRect();
        const x = (percentX / 100) * imgRect.width;
        const y = (percentY / 100) * imgRect.height;

        // Rode cirkel
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        const marker = document.createElement("div");
        marker.classList.add("marker");
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        zoekplaat.appendChild(marker);

        // Zoek item in de lijst en markeer als gevonden
        const listItem = itemList.querySelector(`[data-item="${itemKey}"]`);
        if (listItem) listItem.classList.add("found");
    }
});