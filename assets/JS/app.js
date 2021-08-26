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

// Movie api key = 7c6c005c
const axios = window.axios
const localStorage = window.localStorage

let movie = []
const saved = JSON.parse(localStorage.getItem('saved')) || []

document.getElementById('mainSearch').addEventListener('click', event => {
  event.preventDefault()

  const searchInput = document.getElementById('searchInput').value

  document.getElementById('mainSection').innerHTML = ''

  axios.get(`http://www.omdbapi.com/?apikey=7c6c005c&s=${searchInput}`)
    .then(movieRes => {
      let movies = movieRes.data.Search
      console.log(movieRes)
      document.getElementById('searchInput').value = ''

      let movieOutput = ''

      document.getElementById('movies').innerHTML = ''

      movies.forEach(movie => {

        movieOutput +=
          `
              <div class="card cd">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="${movie.Poster}" alt="${movie.Title}">
                  </figure>
                </div>
                <div class="card-content ct">
                  <div class="media">
                    <div class="content">
                      <h1 class="is-4 movieTitle">${movie.Title}</h1><br>
                      <h4 class="subtitle is-4">Released Year: ${movie.Year}</h4>
                    </div>
                  </div>
                  <div class="content">
                    <h5>IMDB ID: ${movie.imdbID}</h5>
                    <br>
                  </div>
                  <div class="icos">

                    <button class="button favMovie" type="submit" data-id="fav${movie.imdbID}">
                      <ion-icon name="bookmark-outline"></ion-icon>
                    </button>

                    <button class="button saveMovie" type="submit"  data-id="saved${movie.imdbID}">
                      <ion-icon name="heart-outline"></ion-icon>
                    </button>

                  </div>
                </div>
              </div>
        `
      })
      document.getElementById('movies').innerHTML = movieOutput

      // document.getElementById('movie').value = ''
    })
    .catch(err => console.log(err))

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
    .then(bookRes => {
      document.getElementById('searchInput').value = ''
      console.log(bookRes);
      let books = bookRes.data.items
      let bookOutput = ''

      document.getElementById('books').innerHTML = ''

      books.forEach(book => {

        bookOutput +=
          `
            <div class="card cd">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="Placeholder image">
                </figure>
              </div>
              <div class="card-content ct">
                <div class="media">
                  <div class="content">
                    <h1 class="is-4 bookTitle">${book.volumeInfo.title}</h1><br>
                    <p class="subtitle is-6"><strong>Authors: </strong>${book.volumeInfo.authors}</p>
                    <h5 class="subtitle is-5">Published Date: ${book.volumeInfo.publishedDate}</h5>
                  </div>
                </div>
                <div class="content">
                  <p>${book.volumeInfo.description}<p>
                  <br>
                  <p><strong>Publisher: </strong>${book.volumeInfo.publisher}</p>
                  <br>
                </div>

                <div class="icos">
                  <button class="button favBook" type="submit" data-id="fav${book.id}">
                  <ion-icon name="bookmark-outline"></ion-icon>
                  </button>

                  <button class="button saveBook" type="submit" data-id="saved${book.id}">
                  <ion-icon name="heart-outline"></ion-icon>
                  </button>

                </div>
              </div>
            </div>
          `

      })
      document.getElementById('books').innerHTML = bookOutput
    })
    .catch(err => console.log(err))
})