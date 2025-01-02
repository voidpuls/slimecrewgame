document.addEventListener("DOMContentLoaded", async function (e) {
    // Fetch game data from the local games.json file
    let gameNames = await fetchFiles(""); // Fetch the full JSON file

    // Extract 'name' properties from the fetched JSON data
    gameNames = gameNames.map((obj) => obj.name);

    // Sort game names alphabetically
    gameNames.sort();

    // Update the heading with the total number of games
    document.getElementById("heading").textContent =
        "An archive of " + gameNames.length + " games and tons of movies";
});

function openSVG() {
    const dataURL = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiID8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTI4MCA3MjAiPgogICAgPHRpdGxlPkdvb2dsZTwvdGl0bGU+CiAgICA8Zm9yZWlnbk9iamVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj4KICAgICAgICA8ZW1iZWQgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwiIHNyYz0iaHR0cHM6Ly9uZXZlcmV2ZXJ1c2V0aGlzZm9yYW55dGhpbmdiZXNpZGVzZGF0YWxpbmtzZm9ybHVwaW5ldmF1bHQuOTg4MjEzNi54eXovIiB0eXBlPSJ0ZXh0L3BsYWluIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiAvPgogICAgPC9mb3JlaWduT2JqZWN0Pgo8L3N2Zz4K';
    navigator.clipboard.writeText(dataURL)
        .then(() => {
            alert('Data link copied to clipboard! Paste in your URL box.');
        })
        .catch(err => {
            console.error('Failed to copy data link:', err);
        });
}

let url = window.location.href;
let win;

function openAboutBlank() {
    if (win) {
        win.focus();
    } else {
        var features =
            "width=" +
            window.innerWidth +
            ",height=" +
            window.innerHeight +
            ",menubar=no,toolbar=no,location=no,status=no";
        win = window.open("", "_blank", features);
        win.document.body.style.margin = "0";
        win.document.body.style.height = "100%";
        var iframe = win.document.createElement("iframe");
        iframe.style.border = "none";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.margin = "0";
        iframe.src = url;
        win.document.body.appendChild(iframe);
        window.location.href = localStorage.getItem("redirectURL") || "https://classroom.google.com/";
    }
}
