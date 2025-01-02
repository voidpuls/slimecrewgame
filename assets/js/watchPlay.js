const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');
const type = urlParams.get('type');
var season = null;
var episode = null;

if (type == 'tv') {
    season = urlParams.get('season');
    episode = urlParams.get('episode');
    document.getElementById('movieIframe').src = `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`;
} else {
    document.getElementById('movieIframe').src = `https://vidsrc.icu/embed/movie/${id}`;
}



