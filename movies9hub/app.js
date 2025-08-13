/* Movies9Hub – Legal movie catalog template */

const appState = {
  allMovies: [],
  filteredMovies: [],
  selectedGenre: "",
  selectedYear: "",
  sortBy: "title-asc",
  searchQuery: "",
};

const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Family",
  "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi",
];

function generatePlaceholderMovies(count = 100) {
  const movies = [];
  const currentYear = new Date().getFullYear();
  for (let index = 1; index <= count; index += 1) {
    const genre = GENRES[(index - 1) % GENRES.length];
    const year = currentYear - ((index - 1) % 40);
    const rating = (Math.random() * 4 + 6).toFixed(1); // 6.0 to 10.0
    movies.push({
      id: index,
      title: `Sample Movie ${index}`,
      year,
      genre,
      rating: Number(rating),
      description: `This is a placeholder description for Sample Movie ${index}. Replace with real details for content you have rights to share.`,
      posterColor: `hsl(${(index * 23) % 360} 40% 30%)`,
      // downloadUrl: "", // Intentionally omitted. Add only for content you have rights to distribute.
      trailerUrl: "", // Optional: add a legal trailer URL
    });
  }
  return movies;
}

function init() {
  // Seed placeholder data
  appState.allMovies = generatePlaceholderMovies(100);

  // Setup filter dropdowns
  const genreFilter = document.getElementById("genre-filter");
  GENRES.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });

  const years = Array.from(new Set(appState.allMovies.map((m) => m.year))).sort((a, b) => b - a);
  const yearFilter = document.getElementById("year-filter");
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearFilter.appendChild(option);
  });

  // Bind inputs
  document.getElementById("search-input").addEventListener("input", (e) => {
    appState.searchQuery = e.target.value.trim().toLowerCase();
    applyFilters();
  });
  genreFilter.addEventListener("change", (e) => {
    appState.selectedGenre = e.target.value;
    applyFilters();
  });
  yearFilter.addEventListener("change", (e) => {
    appState.selectedYear = e.target.value;
    applyFilters();
  });
  document.getElementById("sort-select").addEventListener("change", (e) => {
    appState.sortBy = e.target.value;
    applyFilters();
  });

  // Footer year
  document.getElementById("year").textContent = String(new Date().getFullYear());

  // Modal wiring
  setupModal();

  // First render
  applyFilters();
}

function applyFilters() {
  const { allMovies, selectedGenre, selectedYear, searchQuery } = appState;
  let results = allMovies.slice();

  if (selectedGenre) {
    results = results.filter((m) => m.genre === selectedGenre);
  }
  if (selectedYear) {
    const yearNum = Number(selectedYear);
    results = results.filter((m) => m.year === yearNum);
  }
  if (searchQuery) {
    results = results.filter((m) => m.title.toLowerCase().includes(searchQuery));
  }

  results = sortMovies(results, appState.sortBy);

  appState.filteredMovies = results;
  renderResults();
}

function sortMovies(movies, sortBy) {
  const sorted = movies.slice();
  switch (sortBy) {
    case "title-desc":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "year-desc":
      sorted.sort((a, b) => b.year - a.year);
      break;
    case "year-asc":
      sorted.sort((a, b) => a.year - b.year);
      break;
    case "rating-desc":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "rating-asc":
      sorted.sort((a, b) => a.rating - b.rating);
      break;
    case "title-asc":
    default:
      sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
  return sorted;
}

function renderResults() {
  const grid = document.getElementById("movies-grid");
  grid.innerHTML = "";

  const resultsSummary = document.getElementById("results-summary");
  resultsSummary.textContent = `${appState.filteredMovies.length} movies shown`;

  const fragment = document.createDocumentFragment();
  appState.filteredMovies.forEach((movie) => {
    fragment.appendChild(createCard(movie));
  });
  grid.appendChild(fragment);
}

function createCard(movie) {
  const card = document.createElement("article");
  card.className = "card";

  const poster = document.createElement("div");
  poster.className = "card-poster";
  poster.style.background = movie.posterColor;
  poster.title = movie.title;

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = movie.title;

  const meta = document.createElement("div");
  meta.className = "card-meta";
  meta.textContent = `${movie.genre} • ${movie.year} • ★ ${movie.rating.toFixed(1)}`;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const detailsBtn = document.createElement("button");
  detailsBtn.className = "btn secondary";
  detailsBtn.type = "button";
  detailsBtn.textContent = "Details";
  detailsBtn.addEventListener("click", () => openDetails(movie));

  const downloadLink = document.createElement("a");
  downloadLink.className = "btn primary";
  downloadLink.textContent = movie.downloadUrl ? "Download" : "Download (N/A)";
  downloadLink.href = movie.downloadUrl || "#";
  downloadLink.target = movie.downloadUrl ? "_blank" : "_self";
  downloadLink.rel = movie.downloadUrl ? "noopener noreferrer" : "";
  if (!movie.downloadUrl) downloadLink.setAttribute("disabled", "true");
  downloadLink.addEventListener("click", (e) => {
    if (!movie.downloadUrl) {
      e.preventDefault();
      openInfoModal();
    }
  });

  actions.append(detailsBtn, downloadLink);
  body.append(title, meta, actions);
  card.append(poster, body);
  return card;
}

function openDetails(movie) {
  const container = document.getElementById("modal-body");
  container.innerHTML = "";

  const title = document.createElement("h3");
  title.id = "modal-title";
  title.textContent = movie.title;

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = `${movie.genre} • ${movie.year} • ★ ${movie.rating.toFixed(1)}`;

  const description = document.createElement("p");
  description.textContent = movie.description;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const legalNote = document.createElement("p");
  legalNote.className = "meta";
  legalNote.textContent = "Only add download links for content you own or have explicit rights to distribute.";

  if (movie.trailerUrl) {
    const trailer = document.createElement("a");
    trailer.href = movie.trailerUrl;
    trailer.target = "_blank";
    trailer.rel = "noopener noreferrer";
    trailer.className = "btn secondary";
    trailer.textContent = "Watch trailer";
    actions.appendChild(trailer);
  }

  if (movie.downloadUrl) {
    const dl = document.createElement("a");
    dl.href = movie.downloadUrl;
    dl.target = "_blank";
    dl.rel = "noopener noreferrer";
    dl.className = "btn primary";
    dl.textContent = "Download";
    actions.appendChild(dl);
  } else {
    const disabled = document.createElement("button");
    disabled.className = "btn primary";
    disabled.disabled = true;
    disabled.textContent = "Download (N/A)";
    actions.appendChild(disabled);
  }

  container.append(title, meta, description, actions, legalNote);
  toggleModal(true);
}

function openInfoModal() {
  const container = document.getElementById("modal-body");
  container.innerHTML = "";
  const title = document.createElement("h3");
  title.textContent = "Downloads unavailable";
  const body = document.createElement("p");
  body.textContent = "This template does not include copyrighted content. Add links only for content you own or that is in the public domain in your jurisdiction.";
  container.append(title, body);
  toggleModal(true);
}

function setupModal() {
  const modal = document.getElementById("modal");
  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", () => toggleModal(false));
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleModal(false);
  });
}

function toggleModal(show) {
  const modal = document.getElementById("modal");
  modal.setAttribute("aria-hidden", show ? "false" : "true");
}

window.addEventListener("DOMContentLoaded", init);