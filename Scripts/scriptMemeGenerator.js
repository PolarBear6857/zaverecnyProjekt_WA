// Získání vstupních prvků z HTML
const imageFileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");

let image;

// Přidání posluchače události pro změnu souboru
imageFileInput.addEventListener("change", (e) => {
    const imageDataUrl = URL.createObjectURL(e.target.files[0]);

    // Vytvoření objektu Image pro zobrazení nahraného obrázku
    image = new Image();
    image.src = imageDataUrl;

    // Přidání posluchače události pro načtení obrázku
    image.addEventListener("load", () => {
            // Aktualizace canvasu s novým obrázkem a texty
            updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
        }, {once: true} // Nastavení volání posluchače pouze jednou
    );
});

// Přidání posluchače události pro změnu textu
topTextInput.addEventListener("change", () => {
    // Aktualizace canvasu s novým textem
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
    // Aktualizace canvasu s novým textem
    updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

// Funkce pro zobrazení obrázku na canvasu
function DrawOnCanvas(canvas, tmpImage, topText, bottomText) {
    if (tmpImage) {
        const ctx = canvas.getContext("2d");
        const width = tmpImage.width;
        const height = tmpImage.height;
        const fontSize = Math.floor(width / 10);
        const yOffset = height / 25;

        // Aktualizace pozadí canvasu
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(tmpImage, 0, 0);

        // Nastavení stylu a fontu pro text
        ctx.strokeStyle = "black";
        ctx.lineWidth = Math.floor(fontSize / 4);
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.lineJoin = "round";
        ctx.font = `${fontSize}px sans-serif`;

        // Přidání textu nahoře
        ctx.textBaseline = "top";
        ctx.strokeText(topText, width / 2, yOffset);
        ctx.fillText(topText, width / 2, yOffset);

        // Přidání textu dole
        ctx.textBaseline = "bottom";
        ctx.strokeText(bottomText, width / 2, height - yOffset);
        ctx.fillText(bottomText, width / 2, height - yOffset);
    }
}

// Funkce pro aktualizaci canvasu s novým obrázkem a texty
function updateMemeCanvas(canvas, image, topText, bottomText) {
    DrawOnCanvas(canvas, image, topText, bottomText);
}


