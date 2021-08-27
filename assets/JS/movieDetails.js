// function to get the movie from the id that was set to local storage
function getMovie() {
  let imdbID = localStorage.getItem('imdbID')
  console.log(imdbID);

  axios.get(`https://www.omdbapi.com/?apikey=7c6c005c&i=${imdbID}`)
    .then(res => {

      console.log(res);

      // output the axios response information for this movie id to a new page and add the html
      let movie = res.data;
      let output = `
    <div class="column is-narrow is-centered is-mobile is-three-fifths is-offset-one-quarter" >
      <div class="card fullSize cd">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${movie.Poster}" alt="${movie.Title}" class="movieImg">
          </figure>
        </div>
          <div class="card-content ct detail">
            <div class="media">
              <div class="media-content">
                <p><strong>Title: </strong>${movie.Title}</p>
                <p><strong>Director: </strong>${movie.Director}</p>
                <p><strong>Genre: </strong>${movie.Genre}</p>
                <p><strong>Released: </strong>${movie.Released}</p>
                <p><strong>Rated: </strong>${movie.Rated}</p>
                <hr>
                <h5><strong>Actors: </strong>${movie.Actors} ...</h5>
                <br>
                <p><strong>Plot: </strong>${movie.Plot}</p>
                <br>
                <p><strong>Runtime: </strong>${movie.Runtime}</p>
                <p><strong>Year Released: </strong>${movie.Released}</p>
                <hr>
                <p><strong>IMDB Rating: </strong>${movie.imdbRating}/10</p>
                <p><strong>IMDB Votes: </strong>${movie.imdbVotes}</p>
                <p><strong>MetaScore: </strong>${movie.Metascore}/100</p>
                <p><strong>Rotten tomato: </strong>${movie.Ratings[1].Value}</p>
              </div>
            </div>

            <div class="content">
              <h4>Movie IMDB ID: ${movie.imdbID}</h4>
              <br>
            </div>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="button is-link">View IMDB</a>
              <hr>
              <a href="index.html" class="button is-info">Go back to Main Search Page</a>
             </div>
            </div>
          </div>
        </div>
 `
      document.getElementById('movieInfoPage').innerHTML = output
    })
    .catch(err => console.log(err));
}

// call the function
getMovie()

// Bulma Java required for navbar
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target)

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active')
        $target.classList.toggle('is-active')

      })
    })
  }
})