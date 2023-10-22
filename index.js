import apiKey from "./keys.json" assert { type: "json" };
import moviesData from "./movieList.json" assert { type: "json" };

const apikey = apiKey.apikey;
const searchSection = document.querySelector(".movie-section");
const menuSearchButton = document.querySelector(".navbar a");
const menuLastSearchesButton = document.querySelector(
  ".navbar li:nth-child(2) > a"
);
const menuFavoritesButton = document.querySelector(
  ".navbar li:nth-child(3) > a"
);
const movieSectionTitleElement = document.querySelector(
  ".movie-section-title h1"
);
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");
const lastSearchedMovies = localStorage.getItem("lastSearchedMovies")
  ? JSON.parse(localStorage.getItem("lastSearchedMovies"))
  : { movies: [] };
let favoriteMovies = localStorage.getItem("favoriteMovies")
  ? JSON.parse(localStorage.getItem("favoriteMovies"))
  : { movies: [] };

showRandomMovies();

async function showRandomMovies() {
  movieSectionTitleElement.textContent = "RECOMMENDED MOVIES";
  const movies = moviesData.movies;
  const randomMovies = [];

  for (let i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * 77);
    randomMovies.push(await getMovieByTitle(movies[randomNumber]));
  }

  resultsSectionAllMovies(randomMovies);
}

function menuActions() {
  menuSearchButton.addEventListener("click", () => {
    showRandomMovies();
  });

  menuLastSearchesButton.addEventListener("click", () => {
    lastSearches();
  });

  menuFavoritesButton.addEventListener("click", () => {
    movieSectionTitleElement.innerText = "Favorite Movies";
    resultsSectionAllMovies(favoriteMovies.movies);
  });
}

async function searchFetch(query) {
  const url = `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`;
  const movies = await fetch(url);
  const data = movies.json();

  return data;
}

async function getMovieById(id) {
  const url = `http://www.omdbapi.com/?apikey=${apikey}&i=${id}`;
  const movie = await fetch(url);
  const data = movie.json();
  return data;
}

async function getMovieByTitle(title) {
  const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${title}`;
  const movie = await fetch(url);
  const data = movie.json();
  return data;
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  searchFunction(query);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.keyCode === 13) {
    const query = searchInput.value;
    console.log(query);
    searchFunction(query);
  }
});

function resultsSectionAllMovies(listOfMovies) {
  searchSection.innerHTML = "";

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");
  searchSection.appendChild(resultContainer);

  listOfMovies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieContainerTextsElement = document.createElement("div");
    movieContainerTextsElement.classList.add("movie-container-texts");
    const titleOfTheMovie = document.createElement("h3");
    titleOfTheMovie.innerText = movie.Title;
    const yearElement = document.createElement("h5");
    yearElement.innerText = `Year : ${movie.Year}`;

    movieContainerTextsElement.appendChild(titleOfTheMovie);
    movieContainerTextsElement.appendChild(yearElement);

    movieContainer.appendChild(movieContainerTextsElement);

    const posterOfTheMovie = document.createElement("img");
    posterOfTheMovie.alt = movie.Title;
    posterOfTheMovie.src = movie.Poster;
    movieContainer.appendChild(posterOfTheMovie);
    resultContainer.appendChild(movieContainer);

    movieContainer.addEventListener("click", async () => {
      const data = await getMovieById(movie.imdbID);
      movieSectionTitleElement.textContent = data.Title;
      searchSection.innerHTML = "";
      const movieDetailDiv = document.createElement("div");
      movieDetailDiv.classList.add("movie-details");
      const singleMovieContainer = document.createElement("div");
      singleMovieContainer.classList.add("single-movie-container");
      const yearElement = document.createElement("h3");
      yearElement.innerText = `YEAR : ${data.Year}`;
      const ratingElement = document.createElement("h3");
      ratingElement.innerText = `IMDB RATING : ${data.imdbRating}`;
      const genreElement = document.createElement("h3");
      genreElement.innerText = `Genre : ${data.Genre}`;
      const releaseDateElement = document.createElement("h3");
      releaseDateElement.innerText = `Release Date : ${data.Released}`;
      const runtimeElement = document.createElement("h3");
      runtimeElement.innerText = `Runtime : ${data.Runtime}`;
      const languageElement = document.createElement("h3");
      languageElement.innerText = `Language : ${data.Language}`;
      const awardsElement = document.createElement("h3");
      awardsElement.innerText = `Awards : ${data.Awards}`;
      const countryElement = document.createElement("h3");
      countryElement.innerText = `Country : ${data.Country}`;
      const actorsElement = document.createElement("h3");
      actorsElement.innerText = `Actors : ${data.Actors}`;
      const writersElement = document.createElement("h3");
      writersElement.innerText = `Writer/s : ${data.Writer}`;
      const DirectorElement = document.createElement("h3");
      DirectorElement.innerText = `Director/S : ${data.Director}`;
      const plotElement = document.createElement("p");
      plotElement.innerText = `PLOT : ${data.Plot}`;

      const posterElementDiv = document.createElement("div");
      posterElementDiv.classList.add("poster-container");
      const posterElement = document.createElement("img");
      posterElement.src = data.Poster;
      posterElement.alt = data.Title;

      posterElementDiv.appendChild(posterElement);
      const addFavoriteElement = document.createElement("button");
      addFavoriteElement.classList.add("add-favorite");
      addFavoriteElement.type = "button";
      addFavoriteElement.innerText = "Add To Favorites";
      posterElementDiv.appendChild(addFavoriteElement);

      addFavoriteElement.addEventListener("click", () => {
        addToFavorites(movie);
      });

      if (favoriteMovies.movies.includes(movie)) {
        const removeFavoriteElement = document.createElement("button");
        removeFavoriteElement.classList.add("remove-favorite");
        removeFavoriteElement.type = "button";
        removeFavoriteElement.innerText = "Remove From Favorites";
        posterElementDiv.appendChild(removeFavoriteElement);
        removeFavoriteElement.addEventListener("click", () => {
          removeFromFavorites(movie);
          resultsSectionAllMovies(favoriteMovies.movies);
        });
      }

      singleMovieContainer.appendChild(yearElement);
      singleMovieContainer.appendChild(ratingElement);
      singleMovieContainer.appendChild(genreElement);
      singleMovieContainer.appendChild(releaseDateElement);
      singleMovieContainer.appendChild(runtimeElement);
      singleMovieContainer.appendChild(languageElement);
      singleMovieContainer.appendChild(awardsElement);
      singleMovieContainer.appendChild(countryElement);
      singleMovieContainer.appendChild(actorsElement);
      singleMovieContainer.appendChild(writersElement);
      singleMovieContainer.appendChild(DirectorElement);
      singleMovieContainer.appendChild(plotElement);

      movieDetailDiv.appendChild(posterElementDiv);
      movieDetailDiv.appendChild(singleMovieContainer);

      searchSection.appendChild(movieDetailDiv);
    });
  });
}

function lastSearches() {
  movieSectionTitleElement.textContent = "Last Searches";
  const lastSearchedMoviesDivElement = document.createElement("div");
  lastSearchedMoviesDivElement.classList.add("last-searches-container");
  const lastSearchedMoviesTableElement = document.createElement("table");

  lastSearchedMovies.movies.forEach((movie) => {
    const tr = document.createElement("tr");
    tr.textContent = movie;
    tr.addEventListener("click", () => {
      const query = tr.innerText;
      searchFunction(query);
    });
    lastSearchedMoviesTableElement.appendChild(tr);
  });

  lastSearchedMoviesDivElement.appendChild(lastSearchedMoviesTableElement);
  searchSection.innerHTML = "";
  searchSection.appendChild(lastSearchedMoviesDivElement);
}

async function searchFunction(query) {
  movieSectionTitleElement.textContent = "SEARCH RESULTS";

  let listOfMovies = [];
  try {
    const results = await searchFetch(query);
    listOfMovies = results.Search;
    if (!lastSearchedMovies.movies.includes(query)) {
      lastSearchedMovies.movies.unshift(query);
      localStorage.setItem(
        "lastSearchedMovies",
        JSON.stringify(lastSearchedMovies)
      );
    }
    resultsSectionAllMovies(listOfMovies);
  } catch (error) {
    searchSection.innerHTML = "";
    movieSectionTitleElement.textContent = `Error : ${error.message}`;

    const errorContainer = document.createElement("div");

    errorContainer.classList.add("error-container");
    const errorMessage = document.createElement("h1");
    errorMessage.textContent =
      "An error occured:Please check your internet connection!";
    const errorImage = document.createElement("img");

    errorImage.src = "assets/error.gif";
    errorImage.alt = "error";

    searchSection.appendChild(errorContainer);
    errorContainer.appendChild(errorMessage);
    errorContainer.appendChild(errorImage);
  }
}

function addToFavorites(movie) {
  if (!favoriteMovies.movies.includes(movie)) {
    favoriteMovies.movies.unshift(movie);
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    resultsSectionAllMovies(favoriteMovies.movies);
  } else {
    console.log("zaten var");
  }
}
function removeFromFavorites(movie) {
  if (favoriteMovies.movies.includes(movie)) {
    favoriteMovies.movies = favoriteMovies.movies.filter(
      (each) => each !== movie
    );
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }
}

menuActions();
