axios.get(`http://www.omdbapi.com/?apikey=7c6c005c&t=${searchInput}`)
  .then(res => {
    document.getElementById('searchInput').value = ''

    let movies = res.data

    document.getElementById('section').innerHTML = ''
    movies.forEach(movie => {
      const sectionElem = document.createElement('div')
      sectionElem.className = 'columns is-desktop is-centered'
      sectionElem.innerHTML = `
      <div class="column is-narrow is-half box">
        <div class="card fullsize cd" id="heightAdj">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image">
                  <img src="${movie.Poster}" alt="Movie poster" id="poster">
                </figure>
              </div>

              <div class="media-content">
                <p class="title is-1">${movie.Title}</p>
                <hr>
                <p class="subtitle">Rotten Tomatoes: ${movie.Ratings[1].Value}</p>
                <p class="subtitle">Metacritic: ${movie.Ratings[2].Value}</p>
                <p class="subtitle">IMDB Rating: ${movie.imdbRating}</p>
              </div>
            </div>

            <div class="content">
              <p><strong>Genre: </strong>${movie.Genre}</p>
              <p><strong>Rated: </strong>${movie.Rated}</p>
              <p><strong>Director: </strong>${movie.Director}</p>
              <p><strong>Plot: </strong>${movie.Plot}</p>
            </div>
          </div>
        </div>
      </div>
      `
    })
  })
  .catch(err => console.log(err))