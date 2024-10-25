let gameContainer = document.getElementById("gameContainer");

const repo = 'LupineVault/LupineVault'; // Replace with your repo
const baseUrl = `https://api.github.com/repos/${repo}/contents/`;

async function fetchFiles(dir) {
    const response = await fetch(`${baseUrl}${dir}`);
    const data = await response.json();
    console.log(data);
    return data;
}



function createGameBox(gameName) {
    const gameImg = `../assets/images/games/${gameName}.png`;
    const gameLink = `play.html?g=${gameName}`;
    const gameBox = document.createElement("div");
    gameBox.classList.add("gameBox");
    gameBox.style.backgroundImage = `url('${gameImg}')`;

    const gameText = document.createElement("span");
    gameText.textContent = toTitleCase(gameName.replace(/-/g, " "));

    gameBox.appendChild(gameText);
    gameBox.addEventListener("click", function () {
        window.location.href = gameLink;
    });

    return gameBox;
}

document.addEventListener('DOMContentLoaded', async function (e) {
    gameNames = await fetchFiles("games/files");

    gameNames = gameNames.map(obj => obj.name);
    
    gameNames.sort();

    gameNames.forEach(function (gameName) {
        gameContainer.appendChild(createGameBox(gameName));
    });
});




