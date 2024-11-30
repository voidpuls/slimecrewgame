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

if (!localStorage.getItem("panicKey")) {
  localStorage.setItem("panicKey", "`");
}

document.addEventListener('keydown', (event) => {
  
  if (event.ctrlKey && event.key == localStorage.getItem("panicKey")) {
      location.href = localStorage.getItem("panicRedirectURL") || "https://classroom.google.com";
  }
});

if (localStorage.getItem("pageTitle")) {
  document.title = localStorage.getItem("pageTitle");
}

if (localStorage.getItem("favicon")) {
  const storedFavicon = localStorage.getItem("favicon");

      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = storedFavicon;
      document.head.appendChild(newFavicon);
} else {
  const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = "../../../../../../../../assets/favicon.ico";
      document.head.appendChild(newFavicon);
}
