const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const main = document.getElementById("main");

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

const bookedPlace = localStorage.getItem("seat");

document.getElementById("booked_place").textContent = bookedPlace;
let ticketQuantity = bookedPlace.split(",").length;
console.log(ticketQuantity);
document.getElementById("total_price").textContent = ticketQuantity * 10;

back.addEventListener("click", () => {
  window.location.href = "index.html";
  document.getElementById("booked_place").textContent = "";
});
