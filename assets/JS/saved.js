const localStorage = window.localStorage

// parse through local storage for savedBooks and savedMovies
let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || []
let savedMovies = JSON.parse(localStorage.getItem('savedMovies')) || []

// clear local storage using the clear storage button
document.getElementById('clearStorage').addEventListener('click', event => {
  event.preventDefault()
  localStorage.clear()
  location.reload()
})

// if savedMovies local storage is not 0, then for each movie create the inner html to populate items from local storage
if (savedMovies.length !== 0) {
  document.getElementById('movies').innerHTML = ''

  savedMovies.forEach(movie => {
    const movieElem = document.createElement('div')
    movieElem.innerHTML =
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
           <p class="title is-4">${movie.Title}</p><br>
           <h4 class="subtitle is-4">Released Year: ${movie.Year}</h4>
         </div>
       </div>
       <div class="content">
         <h5>IMDB ID: ${movie.imdbID}</h5>
         <br>
       </div>
       <div class="icos">
        <ion-icon name="trash-outline" class="button is-light deleteMovie" data-id="${movie.imdbID}"></ion-icon>
        <a onclick="movieSelected('${movie.imdbID}')" class="button selectMovieDetails" href="#">Movie Details</a>
       </div>
     </div>
   </div>
   `

    document.getElementById('movies').append(movieElem)
  })
}

// if savedBooks local storage is not 0, then for each book create the inner html to populate items from local storage
if (savedBooks.length !== 0) {
  document.getElementById('books').innerHTML = ''

  savedBooks.forEach(book => {
    const bookElem = document.createElement('div')
    bookElem.innerHTML =
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
        <ion-icon name="trash-outline" class="button is-light deleteBook" data-id="${book.id}"></ion-icon>
        <a onclick="bookSelected('${book.id}')" class="button selectBookDetails" href="#">Book Details</a>
       </div>
     </div>
   </div>
   `

    document.getElementById('books').append(bookElem)
  })
}

// When the deleteBook and deleteMovie are clicked then remove the books and movies
document.addEventListener('click', event => {

  if (event.target.classList.contains('deleteBook')) {
    savedBooks = savedBooks.filter(book => book.id !== event.target.dataset.id)
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks))
    event.target.parentNode.parentNode.parentNode.remove()
  }

  if (event.target.classList.contains('deleteMovie')) {
    savedMovies = savedMovies.filter(movie => movie.imdbID !== event.target.dataset.id)
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
    event.target.parentNode.parentNode.parentNode.remove()
  }
})

// function to grab id from movie selected and set to local storage so can grab id for seperate axios request
function movieSelected(id) {
  localStorage.setItem('imdbID', id)
  window.location = 'movie.html'
  return false;
}

// function to grab id from book selected and set to local storage so can grab id for seperate axios request
function bookSelected(id) {
  localStorage.setItem('bookId', id)
  window.location = 'book.html'
  return false;
}

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
