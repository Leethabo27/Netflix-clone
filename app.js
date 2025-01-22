// API Configuration
const API_KEY = 'c7cc32987f94a4f1e4e58f239edc0e78'; // Your API Key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// Fetch movies by category and display them
async function fetchMovies(category, elementId) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${category}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error(`Error fetching ${category} movies: ${response.statusText}`);
    const data = await response.json();
    displayMovies(data.results, elementId);
  } catch (error) {
    console.error(error);
  }
}

// Display movies dynamically in the specified element
function displayMovies(movies, elementId) {
  const container = document.getElementById(elementId);
  if (!container) {
    console.error(`Element with ID "${elementId}" not found.`);
    return;
  }

  // Adding animated movie cards
  container.innerHTML = movies
    .map((movie) => {
      const releaseDate = new Date(movie.release_date).toDateString();
      return `
      <div class="movie-card">
        <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}" class="movie-image" />
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-date">${releaseDate}</p>
        </div>
      </div>`;
    })
    .join('');
}

// Initialize the app with multiple categories
function init() {
  fetchMovies('popular', 'popular-movies'); // Fetch popular movies
  fetchMovies('top_rated', 'top-rated-movies'); // Fetch top-rated movies
  fetchMovies('now_playing', 'now-playing'); // Fetch currently playing movies
}

init();

