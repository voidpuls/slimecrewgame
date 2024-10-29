const urlParams = new URLSearchParams(window.location.search);
const searchParam = urlParams.get("g");

// Function to make iframe fullscreen
function makeFullscreen() {
    var iframe = document.getElementById('gameFrame');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { // Firefox
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari, Opera
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { // IE/Edge
        iframe.msRequestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    document.getElementById("gameFrame").src = "files/" + searchParam + "/index.html";
    document.getElementById("sourceViewLink").href = "files/" + searchParam + "/index.html";
    document.getElementById("downloadFilesLink").href = "https://download-directory.github.io/?url=https%3A%2F%2Fgithub.com%2FLupineVault%2FLupineVault%2Ftree%2Fmain%2Fgames%2Ffiles%2F" + searchParam;
});