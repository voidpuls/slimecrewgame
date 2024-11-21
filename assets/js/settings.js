document.getElementById('redirect-link-button').addEventListener('click', function(event) {

    const input = document.getElementById('redirect-link-input');

    const link = input.value;

    if (!link.trim() || !link.includes("https://")) {
        alert('Please enter a link with https://');
        return;
    }

    localStorage.setItem('redirectURL', link);
    alert('Set!');
});

