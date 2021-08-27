// function to get the movie from the id that was set to local storage
function getBook() {
  let bookId = localStorage.getItem('bookId')
  console.log(bookId);

  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${bookId}`)
    .then(res => {

      console.log(res);

      // output the axios response information for this movie id to a new page and add the html
      let book = res.data.items[0]
      let output = `
    <div class="column is-narrow is-centered is-mobile is-three-fifths is-offset-one-quarter" >
      <div class="card fullSize cd">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="${book.volumeInfo.title}" class="bookImg">
          </figure>
        </div>
          <div class="card-content ct detail">
            <div class="media">
              <div class="media-content">
                <p><strong>Title: </strong>${book.volumeInfo.title}</p>
                <p><strong>Maturity Rating: </strong>${book.volumeInfo.maturityRating}</p>
                <hr>
                <h5><strong>Authors: </strong>${book.volumeInfo.authors}</h5>
                <h5><strong>Publisher: </strong>${book.volumeInfo.publisher}</h5>
                <hr>
                <p>${book.volumeInfo.description}</p>
                <br>
                <p><strong>Page Count: </strong>${book.volumeInfo.pageCount}</p>
                <p><strong>Published Date: </strong>${book.volumeInfo.publishedDate}</p>
                <hr>
                <p><strong>Rating: </strong>${book.volumeInfo.averageRating}/5</p>
              </div>
            </div>

            <div class="content">
              <h4>Google Book ID: ${book.id}</h4>
              <br>
            </div>
              <a href="http://books.google.com/books?id=${bookId}&dq=${bookId}&hl=&source=gbs_api" target="_blank" class="button is-link">View Google Books</a>
              <hr>
              <a href="index.html" class="button is-info">Go back to Main Search Page</a>
             </div>
            </div>
          </div>
        </div>
 `
      document.getElementById('bookInfoPage').innerHTML = output
    })
    .catch(err => console.log(err));
}

// call the function
getBook()

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