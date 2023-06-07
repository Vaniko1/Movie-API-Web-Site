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
    <img src="${IMG_PATH + movieData.backdrop_path}" >
    <div class="row mt-5"> 
      <div class="col-4">
        <img src="${IMG_PATH + movieData.poster_path}" >
      </div>
      <div class="col-8">
        <h3 class="text-white">${movieData.title}</h3> 
        <p class="text-white">${movieData.overview}</p>
        <p class="text-white">${movieData.original_language}</p>
        <p class="text-white">${movieData.vote_average}</p>
        <h1 class="text-white "><a href="#session" class="text-decoration-none">Session</a></h1>
      </div>
    </div>
`;
main.appendChild(movieDesc);

getMovies(API_URL);

async function getMovies(url) {
  console.log(url);

  const res = await fetch(url);
  console.log(res);

  const data = await res.json();
  console.log(data.results);

  showMovies(data.results);
}
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

const seats = [
  {
    id: 1,
    price: 10,
  },
  {
    id: 2,
    price: 10,
  },
  {
    id: 3,
    price: 10,
  },
  {
    id: 4,
    price: 10,
  },
  {
    id: 5,
    price: 10,
  },
  {
    id: 6,
    price: 10,
  },
  {
    id: 7,
    price: 10,
  },
  {
    id: 8,
    price: 10,
  },
  {
    id: 9,
    price: 10,
  },
];
let arr = [];

seats.forEach((seat) => {
  const { id, price } = seat;

  const seatDrawing_one = document.createElement("div");
  const seatDrawing_two = document.createElement("div");
  const seatDrawing_three = document.createElement("div");

  if (id == 1 || id == 4 || id == 7) {
    seatDrawing_one.innerHTML = `
    <div id="seat1" class="green_seat rounded-3 seat p-3">${id}</div>
    `;
    seat_column_one.appendChild(seatDrawing_one);
  } else if (id == 2 || id == 5 || id == 8) {
    seatDrawing_two.innerHTML = `
    <div id="seat2" class="green_seat rounded-3 seat p-3">${id}</div>
    `;
    seat_column_two.appendChild(seatDrawing_two);
  } else if (id == 3 || id == 6 || id == 9) {
    seatDrawing_three.innerHTML = `
    <div id="seat3" class="green_seat rounded-3 seat p-3">${id}</div>
    `;
    seat_column_three.appendChild(seatDrawing_three);
  }

  seatDrawing_one.addEventListener("click", (e) => {
    if (e.target.classList.contains("green_seat")) {
      e.target.classList.toggle("red");
    }

    if (e.target.classList.contains("red")) {
      arr.push(e.target.textContent);
    } else {
      arr.pop(e.target.textContent);
    }

    const number = arr;
    localStorage.setItem("seat", number);
  });

  seatDrawing_two.addEventListener("click", (e) => {
    if (e.target.classList.contains("green_seat")) {
      e.target.classList.toggle("red");
    }

    if (e.target.classList.contains("red")) {
      arr.push(e.target.textContent);
    } else {
      arr.pop(e.target.textContent);
    }
    const number = arr;

    localStorage.setItem("seat", number);
  });

  seatDrawing_three.addEventListener("click", (e) => {
    if (e.target.classList.contains("green_seat")) {
      e.target.classList.toggle("red");
    }

    if (e.target.classList.contains("red")) {
      arr.push(e.target.textContent);
    } else {
      arr.pop(e.target.textContent);
    }

    const number = arr;
    localStorage.setItem("seat", number);
  });
});
console.log(arr.length);
book.addEventListener("click", () => {
  if (arr.length > 0) {
    window.location.href = "checkout.html";
  } else {
    alert("pick a place");
  }
});
