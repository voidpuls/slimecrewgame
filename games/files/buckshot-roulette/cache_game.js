async function fetchAndCacheFile(url, key) {
    let cachedData = localStorage.getItem(key);
    if (cachedData) {
        console.log(`${key} loaded from localStorage`);
        return new Blob([Uint8Array.from(atob(cachedData), c => c.charCodeAt(0))]);
    } else {
        console.log(`Fetching ${key} from server...`);
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        localStorage.setItem(key, base64Data);
        return new Blob([arrayBuffer]);
    }
}

(async function () {
    const pckFile = await fetchAndCacheFile("index.pck", "index_pck");
    const wasmFile = await fetchAndCacheFile("index.wasm", "index_wasm");

    const engine = new Engine(GODOT_CONFIG); // Use GODOT_CONFIG from index.js

    engine.startGame({
        pck: URL.createObjectURL(pckFile),
        wasm: URL.createObjectURL(wasmFile),
        onProgress: function (current, total) {
            const statusProgressInner = document.getElementById("status-progress-inner");
            if (total > 0) {
                statusProgressInner.style.width = `${(current / total) * 100}%`;
            }
        }
    }).then(() => {
        console.log("Game started successfully");
    }).catch(err => {
        console.error("Error starting game:", err);
    });
})();
