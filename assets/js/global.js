// Function to fetch the JSON file
async function fetchFiles() {
    try {
        const response = await fetch("../assets/games.json"); // Path to your games.json
        if (!response.ok) throw new Error("Failed to fetch JSON");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading JSON file:", error);
        return []; // Return empty array on failure
    }
}

// Function to capitalize game names
function toTitleCase(str) {
    return str.replace(/\b\w+/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

// Function to create a game box
function createGameBox(gameName) {
    const gameImg = `../assets/images/games/${gameName}.png`;
    const gameLink = `play.html?g=${gameName}`;

    const gameBox = document.createElement("div");
    gameBox.classList.add("gameBox");
    gameBox.style.backgroundImage = `url('${gameImg}')`;

    const gameText = document.createElement("span");
    gameText.textContent = toTitleCase(gameName.replace(/-/g, " "));

    gameBox.appendChild(gameText);

    gameBox.addEventListener("click", () => {
        window.location.href = gameLink;
    });

    return gameBox;
}

// Main function to load games
document.addEventListener("DOMContentLoaded", async () => {
    const gameContainer = document.getElementById("gameContainer");
    const heading = document.getElementById("heading");

    // Fetch games data
    const gameData = await fetchFiles();

    console.log("Fetched JSON:", gameData); // Debug: ensure data is correct

    // Extract game names
    const gameNames = gameData.map((obj) => obj.name);
    gameNames.sort();

    // Update heading
    heading.textContent = `An archive of ${gameNames.length} HTML5 games`;

    // Populate games
    gameNames.forEach((gameName) => {
        gameContainer.appendChild(createGameBox(gameName));
    });
});
