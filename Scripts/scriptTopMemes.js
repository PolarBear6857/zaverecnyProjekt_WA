// Funkce pro zobrazení vygenerovaných memes
function GetMemes() {
    while (memeContainer.hasChildNodes()) {
        memeContainer.removeChild(memeContainer.firstChild);
    }
// Změní barvu pozadí <div> s id "container"
    const div = document.getElementById("container");
    div.style.backgroundColor = "#4CAF50";
// Definuje URL API endpointu
    const endpointUrl = "https://api.imgflip.com/get_memes";

// Vytvoří GET požadavek na API endpoint
    fetch(endpointUrl)
        .then(response => response.json()) // Převede odpověď na JSON formát
        .then(data => {
            // Získá prvních 20 URL adres z odpovědi
            const memes = data.data.memes.slice(0, 20);

            // Vytvoří prázdný řetězec pro uložení HTML kódu tabulky
            let tableHtml = "<table class='meme-table'>";

            // Projde všechny memes a pro každý z nich přidá <img> tag
            memes.forEach((meme, index) => {
                // Pokud je tento meme první v řádku, přidá <tr> tag
                if (index % 4 === 0) {
                    tableHtml += "<tr>";
                }

                // Přidá <img> tag pro meme s onclick atributem
                tableHtml += `<td><img class='meme-image' src="${meme.url}" alt="${meme.name}" onclick="showImage('${meme.url}',false)"></td>`;

                // Pokud je tento meme poslední v řádku, přidá </tr> tag
                if (index % 4 === 3) {
                    tableHtml += "</tr>";
                }
            });

            // Přidá všechny zbývající memy do tabulky
            if (memes.length % 4 !== 0) {
                tableHtml += "</tr>";
            }

            // Přidá HTML kód tabulky do tabulky
            tableHtml += "</table>";
            document.getElementById("meme-table").innerHTML = tableHtml;
        })
        .catch(error => console.error(error));
}

const tmpTable = document.getElementById('meme-table');
const memeContainer = document.getElementById('meme-container');


// Funkce pro zobrazení memu v plné velikosti po kliknutí na náhledový obrázek
function showImage(url, isFavouriteMeme) {
    const container = document.createElement('div');
    container.className = 'image-container';
    const img = document.createElement('img');
    img.src = url;
    container.appendChild(img);

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'Close';
    closeButton.onclick = function () {
        document.body.removeChild(container);
    };
    container.appendChild(closeButton);

    // REMOVE FROM FAVOURITE BUTTON
    if (isFavouriteMeme === true) {
        const removeFromFavourite = document.createElement('button');
        removeFromFavourite.innerHTML = 'Remove from favourites';
        removeFromFavourite.onclick = function () {
            //DEBUG
            console.log('hej ale však jsem na to kliknul');
            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost/WA/PHP/remove.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.onload = function () {
                if (xhttp.status === 200) {
                    console.log('Data deleted successfully.');
                } else {
                    console.error('Error:', xhttp.statusText);
                }
            };
            const data = {"meme_url": url};
            console.log(data);
            xhttp.send(JSON.stringify(data));
            alert('Please, click "Show favourite memes!" again to see the changes');
            document.body.removeChild(container);
            removeFromFavourite.click();
        }
        container.appendChild(removeFromFavourite);
    }

    // ADD TO FAVOURITE BUTTON
    if (isFavouriteMeme === false) {
        const favouriteButton = document.createElement('button');
        favouriteButton.innerHTML = 'Add to favourites';
        favouriteButton.onclick = function () {
            const xhr = new XMLHttpRequest();
            const urlPHP = 'http://localhost/WA/PHP/insert.php';
            xhr.open("POST", urlPHP, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log('Data inserted successfully.');
                } else {
                    console.error('Error:', xhr.statusText);
                }
            };
            xhr.onerror = function () {
                console.error('Error:', xhr.statusText);
            };
            const data = {"meme_url": url};
            console.log(data);
            xhr.send(JSON.stringify(data));
            alert('Meme added to favourite memes!');
            document.body.removeChild(container);
        };
        container.appendChild(favouriteButton);
    }
    document.body.appendChild(container);
}

// Funkce pro zobrazení oblíbených memes
function showFavourites() {
    while (memeContainer.hasChildNodes()) {
        memeContainer.removeChild(memeContainer.firstChild);
    }
    document.getElementById('container').style.background = '#4CAF50';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/WA/PHP/connection.php');
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            tmpTable.innerHTML = "";
            data.forEach(meme => {
                const img = document.createElement('img');
                img.src = meme.meme_url;
                img.onclick = () => showImage(meme.meme_url, true);
                img.style.border = '3px solid black';
                img.style.margin = '10px';
                img.style.height = 'auto';
                img.style.width = '25%';
                img.style.objectFit = 'cover';
                img.style.maxHeight = '200px';
                img.style.boxSizing = 'border-box';

                memeContainer.appendChild(img);
            });
        } else {
            console.error('Error:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Error:', xhr.statusText);
    };
    xhr.send();
}