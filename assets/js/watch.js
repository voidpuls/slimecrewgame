const API_KEY = "2713804610e1e236b1cf44bfac3a7776";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

let currentPage = 1;
let isLoading = false;
let searchQuery = "";

// DOM Elements
const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search-input");
const overlay = document.getElementById("overlay");
const movieIframe = document.getElementById("movie-iframe");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const closeBtn = document.getElementById("close-btn");

// Event Listeners
window.addEventListener("scroll", handleScroll);
searchInput.addEventListener("input", handleSearch);
fullscreenBtn.addEventListener("click", toggleFullscreen);
closeBtn.addEventListener("click", closeIframe);

// Fetch Movies
async function fetchMovies(page = 1, query = "") {
    isLoading = true;

    try {
        const url = query
            ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
            : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
            displayMovies(data.results, page === 1);
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
    } finally {
        isLoading = false;
    }
}

// Display Movies
function displayMovies(movies, reset = false) {
    if (reset) moviesContainer.innerHTML = "";

    movies.forEach((movie) => {
        if (!movie.poster_path) return;

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const poster = document.createElement("img");
        poster.src = `${IMAGE_BASE_URL}${movie.poster_path}`;
        poster.alt = `${movie.title} Poster`;

        const title = document.createElement("h3");
        title.textContent = movie.title;

        movieCard.appendChild(poster);
        movieCard.appendChild(title);

        movieCard.addEventListener("click", () => openIframe(movie.id));
        moviesContainer.appendChild(movieCard);
    });
}

// Open Iframe
function openIframe(movieId) {
    movieIframe.src = `https://vidsrc.icu/embed/movie/${movieId}`;
    overlay.style.display = "flex";
}

// Close Iframe
function closeIframe() {
    movieIframe.src = "";
    overlay.style.display = "none";
}

// Fullscreen Toggle
function toggleFullscreen() {
    const iframeContainer = document.getElementById("iframe-container");
    if (!document.fullscreenElement) {
        iframeContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Handle Scroll for Infinite Scrolling
function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        currentPage++;
        fetchMovies(currentPage, searchQuery);
    }
}

// Handle Search Input
function handleSearch(event) {
    const query = event.target.value.trim();
    searchQuery = query;
    currentPage = 1;
    fetchMovies(currentPage, searchQuery);
}

// Initial Load
fetchMovies();
