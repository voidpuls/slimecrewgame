document.getElementById('redirect-link-button').addEventListener('click', function(event) {

    const input = document.getElementById('redirect-link-input');

    const link = input.value;

    if (!link.trim() || !link.includes("https://")) {
        alert('Please enter a link with https://');
        return;
    }

    localStorage.setItem('panicRedirectURL', link);
    alert('Set!');
});

document.getElementById('panic-key-button').addEventListener('click', function(event) {

    const input = document.getElementById('panic-key-input');

    const key = input.value;

    if (key.length !== 1) {
        alert('Please enter one character');
        return;
    }

    localStorage.setItem('panicKey', key);
    alert('Set!');
});

document.getElementById('page-title-button').addEventListener('click', function(event) {

    const input = document.getElementById('page-title-input');

    const title = input.value;

    if (!title.trim()) {
        alert('Please enter a title');
        return;
    }

    localStorage.setItem('pageTitle', title);
    alert('Set! (Reload to see changes)');
});