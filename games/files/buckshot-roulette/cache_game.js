const GODOT_CONFIG = {
    args: [],
    canvasResizePolicy: 2,
    executable: "index",
    experimentalVK: false,
    fileSizes: { "index.pck": 345408288, "index.wasm": 28972640 },
    focusCanvas: true,
    gdextensionLibs: []
};
const engine = new Engine(GODOT_CONFIG);

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
