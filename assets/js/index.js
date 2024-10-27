document.addEventListener("DOMContentLoaded", async function (e) {
    gameNames = await fetchFiles("games/files");

    gameNames = gameNames.map((obj) => obj.name);

    gameNames.sort();

    document.getElementById("heading").textContent = "An archive of  " + gameNames.length + " HTML5 games";
});
