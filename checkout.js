const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const main = document.getElementById("main");

const similar = document.getElementById("similar");

const movie = localStorage.getItem("movie");
console.log(JSON.parse(movie));
const movieData = JSON.parse(movie);

const movieDesc = document.createElement("div");
movieDesc.classList.add("container");

movieDesc.innerHTML = `
    <div class="row mt-5"> 
      <div class="col-4">
        <img src="${IMG_PATH + movieData.poster_path}" >
      </div>
      <div class="col-8">
        <h3 class="text-white">Congratulations! ,you booked a place for ${
          movieData.title
        }</h3> 
        <h4 class="text-white">Happy Watching!</h4>
        <div class="text-white">Your Seat number: <span id="booked_place"></span></div>
        <div class="text-white">Total price: <span id="total_price"></span></div>
        </div>
    </div>
`;
main.appendChild(movieDesc);

function showMovies(movies) {
  similar.innerHTML = " ";

  const smallMovies = (movies = movies
    .sort(() => Math.random() - Math.random())
    .slice(0, 3));
  smallMovies.forEach((movie) => {
    const { title, overview, original_language, vote_average, poster_path } =
      movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("col-4");
    movieEl.innerHTML = `
                <div class="p-4">
                <div class="movies">
                  <img src="${IMG_PATH + poster_path}" >
                  <div class="movie_content_box">
                    <h3>${title}</h3>
                    <p>${overview}</p>
                    <p>${original_language}</p>
                    </div>
                    <span>
                      <p class="${getClassByVote(
                        vote_average
                      )}">${vote_average}</p>
                    </span>
                    </div>
                </div>
            `;
    similar.appendChild(movieEl);
    movieEl.addEventListener("click", () => {
      localStorage.setItem("movie", JSON.stringify(movie));
      window.location = "movie.html";
    });
  });
}

function getClassByVote(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

const bookedPlace = localStorage.getItem("seat");

document.getElementById("booked_place").textContent = bookedPlace;
let ticketQuantity = bookedPlace.split(",").length;
console.log(ticketQuantity);
document.getElementById("total_price").textContent = ticketQuantity * 10;

back.addEventListener("click", () => {
  window.location.href = "index.html";
  document.getElementById("booked_place").textContent = "";
});
