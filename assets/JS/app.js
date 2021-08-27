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

const axios = window.axios
const localStorage = window.localStorage

// Local storage for saved book and saved movies for when user saves (clicks icon for each)
const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || []
const savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || []

// setting emtpy array
let books = []
let movies = []

// when the mainSearch is clicked
document.getElementById('mainSearch').addEventListener('click', event => {
  event.preventDefault()

  document.getElementById('mainSection').innerHTML = ''

  // search variable set to the searchInput from user to be used for axios requests
  const search = document.getElementById('searchInput').value
  console.log(search);

  // axios request for movies (omdb api)
  axios.get(`http://www.omdbapi.com/?apikey=7c6c005c&s=${search}`)
    .then(movieRes => {
      movies = movieRes.data.Search
      console.log(movies)

      document.getElementById('movies').innerHTML = ''
      let movieOutput = ''

      // For each movie in the response create html elements and append to the html section placeholder
      // movies.forEach(movie => )
      $.each(movies, (index, movie) => {
        if (index > 10) {
          return false
        } else {
          // const movieElem = document.createElement('div')
          // movieElem.innerHTML =
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
                    <div class="media-content">
                      <p class="title is-4">${movie.Title}</p><br>
                      <h4 class="subtitle is-4">Released Year: ${movie.Year}</h4>
                    </div>
                  </div>
                  <div class="content">
                    <h5>IMDB ID: ${movie.imdbID}</h5>
                    <br>
                  </div>
                  <div class="icos">
                    <ion-icon name="bookmark-outline" id="saveMv" class="button is-light saveMovie notSaved" data-id="${movie.imdbID}"></ion-icon>
                  </div>
                </div>
              </div>
        `
          // document.getElementById('movies').append(movieElem)
          document.getElementById('movies').innerHTML = movieOutput
        }
      })

      document.getElementById('searchInput').value = ''
    })
    .catch(movieErr => console.error(movieErr))

  // axios requesst for books (google books api)
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
    .then(bookRes => {
      books = bookRes.data.items
      console.log(books)

      document.getElementById('books').innerHTML = ''
      let bookOutput = ''

      // For each movie in teh response create html elements and append to the html section placeholder
      // books.forEach(book => )
      $.each(books, (index, book) => {
        if (index > 10) {
          return false
        } else {
          // const bookElem = document.createElement('div')
          // bookElem.innerHTML =
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
                  <div class="media-content">
                    <p class="title is-4">${book.volumeInfo.title}</p><br>
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
                  <ion-icon name="bookmark-outline" id="saveBk" class="button is-light saveBook notSaved" data-id="${book.id}"></ion-icon>
                </div>
              </div>
            </div>
        `
          // document.getElementById('books').append(bookElem)
          document.getElementById('books').innerHTML = bookOutput
        }
      })

      document.getElementById('searchInput').value = ''
    })
    .catch(bookErr => console.error(bookErr))


})

// event listener when the save movie and save book button is clicked
document.addEventListener('click', event => {

  // if saveBook push to savedBooks local storage
  if (event.target.classList.contains('saveBook')) {
    const book = books.filter(book => book.id === event.target.dataset.id)[0]
    savedBooks.push(book)
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks))
    // event.target.parentNode.parentNode.parentNode.remove()
    event.target.setAttribute('name','bookmark')
    event.target.classList.remove('notSaved')
    event.target.classList.add('isSaved')

  }

  // if saveMovie push to saveMovie local storage
  if (event.target.classList.contains('saveMovie')) {
    const movie = movies.filter(movie => movie.imdbID === event.target.dataset.id)[0]
    savedMovies.push(movie)
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
    // event.target.parentNode.parentNode.remove()
    event.target.setAttribute('name', 'bookmark')
    event.target.classList.remove('notSaved')
    event.target.classList.add('isSaved')
  }
})
