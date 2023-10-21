import apiKey from "./keys.json" assert { type: "json" };
import moviesData from "./movieList.json" assert { type: "json" };

const apikey = apiKey.apikey;
const searchSection = document.getElementsByClassName("movie-section")[0];
const menuSearchButton = document.querySelector(".navbar a");
const menuLastSearchesButton = document.querySelector(
  ".navbar li:nth-child(2) > a"
);
const menuFavoritesButton = document.querySelector(
  ".navbar li:nth-child(3) > a"
);
const movieSectionTitleElement = document.querySelector('.movie-section-title h1')

const searchInput = document.querySelector(".search-bar input");
const searchButton = document.querySelector(".search-bar button");

async function showRandomMovies() {
movieSectionTitleElement.textContent='RECOMMENDED MOVIES';
  const movies =  moviesData.movies;
  const randomMovies = [];


  for (let i = 0; i < 3; i++) {
    const randomNumber = Math.floor(Math.random() * 77);
    randomMovies.push(await getMovieByTitle(movies[randomNumber]));
  }

  resultsSectionAllMovies(randomMovies);
};

showRandomMovies();
const menuActions = () => {
  //Search Button Clears the Section
  menuSearchButton.addEventListener("click", () => {
    searchSection.innerHTML = "";
    showRandomMovies();
  });

  menuLastSearchesButton.addEventListener("click", () => {
    //Burayı sonra yap
  });

  menuFavoritesButton.addEventListener("click", () => {
    searchSection.innerHTML = "";
    //Burayı sonra yap
  });
};

const searchFetch = async (query) => {
  const url = `http://www.omdbapi.com/?apikey=${apikey}&s=${query}`;
  const movies = await fetch(url);
  const data = movies.json();

  return data;
};

async function getMovieById(id) {
  const url = `http://www.omdbapi.com/?apikey=${apikey}&i=${id}`;
  const movie = await fetch(url);
  const data = movie.json();
  return data;
};

async function getMovieByTitle(title) {
  const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${title}`;
  const movie = await fetch(url);
  const data = movie.json();
  return data;
};

searchButton.addEventListener("click", async () => {
  movieSectionTitleElement.textContent='SEARCH RESULTS';

  let listOfMovies = [];
  try {
    const query = searchInput.value;
    const results = await searchFetch(query);
    listOfMovies = results.Search;
    resultsSectionAllMovies(listOfMovies);
  } catch (error) {
    searchSection.innerHTML = "";
    const errorDivElement = document.createElement("div");
    const errorElement = document.createElement("h1");
    errorElement.textContent = error.message;
    errorDivElement.appendChild(errorElement);
    searchSection.appendChild(errorDivElement);
  }
});

const resultsSectionAllMovies = (listOfMovies) => {
  searchSection.innerHTML = "";

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");
  searchSection.appendChild(resultContainer);

  listOfMovies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    const titleOfTheMovie = document.createElement("h1");
    titleOfTheMovie.innerText = `${movie.Title} (${movie.Year})`;
    movieContainer.appendChild(titleOfTheMovie);

    const posterOfTheMovie = document.createElement("img");
    posterOfTheMovie.alt = movie.Title;
    posterOfTheMovie.src = movie.Poster;
    movieContainer.appendChild(posterOfTheMovie);
    resultContainer.appendChild(movieContainer);

    movieContainer.addEventListener("click", async () => {
      const data = await getMovieById(movie.imdbID);
      movieSectionTitleElement.textContent = data.Title;
      searchSection.innerHTML = "";
      const singleMovieContainer = document.createElement("div");
      singleMovieContainer.classList.add("single-movie-container");
      const typeElement = document.createElement("h3");
      typeElement.innerText = `Type : ${data.Type}`;
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
      const posterElement = document.createElement("img");
      posterElement.src = data.Poster;
      posterElement.alt = data.Title;

      singleMovieContainer.appendChild(typeElement);
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

      searchSection.appendChild(singleMovieContainer);
      searchSection.appendChild(posterElement);
    });
  });






  /*
    {
    "Title": "The Lord of the Rings: The Fellowship of the Ring",
    "Year": "2001",
    "Rated": "PG-13",
    "Released": "19 Dec 2001",
    "Runtime": "178 min",
    "Genre": "Action, Adventure, Drama",
    "Director": "Peter Jackson",
    "Writer": "J.R.R. Tolkien, Fran Walsh, Philippa Boyens",
    "Actors": "Elijah Wood, Ian McKellen, Orlando Bloom",
    "Plot": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    "Language": "English, Sindarin",
    "Country": "New Zealand, United States",
    "Awards": "Won 4 Oscars. 125 wins & 127 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "8.8/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "91%"
        },
        {
            "Source": "Metacritic",
            "Value": "92/100"
        }
    ],
    "Metascore": "92",
    "imdbRating": "8.8",
    "imdbVotes": "1,948,559",
    "imdbID": "tt0120737",
    "Type": "movie",
    "DVD": "28 Jun 2011",
    "BoxOffice": "$316,115,420",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}
*/
};

menuActions();
