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
    // Fetch games.json and simulate getting the "games/files" directory
    let gameNames = await fetchFiles(""); // Empty string for full data

    // Extract 'name' properties from the fetched JSON data
    gameNames = gameNames.map((obj) => obj.name);

    // Sort and create game boxes
    gameNames.sort();

    gameNames.forEach(function (gameName) {
        gameContainer.appendChild(createGameBox(gameName));
    });

    // Update the game count
    document.getElementById("gameCount").textContent =
        "There are currently " + gameNames.length + " games in the LupineVault.";

    // Add search filter functionality
    document.getElementById("searchInput").addEventListener("input", filterGames);
});
