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

// Set a default panic key if not already set
if (!localStorage.getItem("panicKey")) {
  localStorage.setItem("panicKey", "`");
}

// Event listener for panic redirect
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === localStorage.getItem("panicKey")) {
    location.href = localStorage.getItem("panicRedirectURL") || "https://classroom.google.com";
  }
});

// Set page title from localStorage if available
if (localStorage.getItem("pageTitle")) {
  document.title = localStorage.getItem("pageTitle");
}

// Set favicon from localStorage or use the default
const faviconHref = localStorage.getItem("favicon") || "../LupineVault/assets/images/logo.png";
const faviconLink = document.createElement("link");
faviconLink.rel = "icon";
faviconLink.href = faviconHref;
document.head.appendChild(faviconLink);
