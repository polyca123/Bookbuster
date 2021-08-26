// function to get the movie from the id that was set to local storage
function getMovie() {
 let imdbID = localStorage.getItem('imdbID')
 console.log(imdbID);

 axios.get(`http://www.omdbapi.com/?apikey=7c6c005c&i=${imdbID}`)
  .then(res => {

   console.log(res);

   // output the axios response information for this movie id to a new page and add the html
   let movie = res.data;
   let output = `
    <div class="column is-narrow is-half" >
      <div class="card fullSize cd">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${movie.Poster}" alt="${movie.Title}" class="bookImg">
          </figure>
        </div>
          <div class="card-content ct">
            <div class="media">
              <div class="media-content">
                <p>Title: ${movie.Title}</p>
                <p>Genre: ${movie.Genre}</p>
                <p>Released: ${movie.Released}</p>
                <p>Rated: ${movie.Rated}</p>
                <hr>
                <h5>Actors: ${movie.Actors}</h5>
                <br>
                <p>Plot: ${movie.Plot}</p>
                <br>
                <p>Runtime: ${movie.Runtime}</p>
                <p>Year Released: ${movie.Released}</p>
                <hr>
                <p>IMDB Rating: ${movie.imdbRating}/10</p>
                <p>IMDB Rating Votes: ${movie.imdbVotes}</p>
                <p>MetaScore Rating: ${movie.Metascore}/100</p>
                <p>Rotten tomato Rating: ${movie.Ratings[1].Value}</p>
              </div>
            </div>

            <div class="content">
              <h3>Movie IMDB ID: ${movie.imdbID}</h3>
              <br>
            </div>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="button">View IMDB</a>
              <a href="index.html" class="button">Go back to Main Search Page</a>
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