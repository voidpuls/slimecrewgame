function toTitleCase(str) {
    return str.replace(/\b\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const repo = "LupineVault/LupineVault"; // Replace with your repo
const baseUrl = `https://api.github.com/repos/${repo}/contents/`;

async function fetchFiles(dir) {
    const response = await fetch(`${baseUrl}${dir}`);
    const data = await response.json();
    console.log(data);
    return data;
}

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === '`') {
      location.href = localStorage.getItem("redirectURL");
  }
});