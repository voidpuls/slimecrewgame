let gameContainer = document.getElementById("gameContainer");



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

function filterGames() {
    const filterValue = this.value.toLowerCase();
    document.querySelectorAll(".gameBox").forEach(function (gameBox) {
        const gameText = gameBox.textContent.toLowerCase();
        gameBox.style.display = gameText.includes(filterValue)
            ? "block"
            : "none";
    });
}

document.addEventListener("DOMContentLoaded", async function (e) {
    gameNames = await fetchFiles("games/files");

    gameNames = gameNames.map((obj) => obj.name);

    gameNames.sort();

    gameNames.forEach(function (gameName) {
        gameContainer.appendChild(createGameBox(gameName));
    });

    document.getElementById("gameCount").textContent = "There are currently " + gameNames.length + " games in the LupineVault.";

    document.getElementById("searchInput").addEventListener("input", filterGames);
});

