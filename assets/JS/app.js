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
let movie = []
const saved = JSON.parse(localStorage.getItem('saved')) || []

document.getElementById('mainSearch').addEventListener('click', event => {
  event.preventDefault()

  const searchInput = document.getElementById('searchInput').value

  axios.get(`http://www.omdbapi.com/?apikey=7c6c005c&t=${searchInput}`)
    .then(res => {
      document.getElementById('searchInput').value = ''
      console.log(res)
      let movie = res.data
      document.getElementById('movie').innerHTML = `
      <img src="${movie.Poster}" alt="Placeholder image" id="poster">
      `
    })
    .catch(err => console.log(err))

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
    .then(res => {
      document.getElementById('searchInput').value = ''

      console.log(res)
      let book = res.data.items[0]
      document.getElementById('book').innerHTML = `
      <img src="${book.volumeInfo.imageLinks.thumbnail}">
      `

    })
    .catch(err => console.log(err))
})