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
    <div class="column is-narrow is-half" >
      <div class="card fullSize cd">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="${book.volumeInfo.title}" class="bookImg">
          </figure>
        </div>
          <div class="card-content ct">
            <div class="media">
              <div class="media-content">
                <h5>Authors: ${book.volumeInfo.authors}</h5>
                <hr>
                <p>Rating: ${book.volumeInfo.averageRating}</p>
                <p>Ratings Count: ${book.volumeInfo.ratingsCount}</p>
                <p>Page Count: ${book.volumeInfo.pageCount}</p>
                <p>Maturity Rating: ${book.volumeInfo.maturityRating}</p>
                <p>Published Date: ${book.volumeInfo.publishedDate}</p>
              </div>
            </div>

            <div class="content">
              <h3>Google Book ID: ${book.id}</h3>
              <p>${book.volumeInfo.description}</p>
              <br>
            </div>
              <a href="http://books.google.com/books?id=${bookId}&dq=${bookId}&hl=&source=gbs_api" target="_blank" class="button">View Google Books</a>
              <a href="index.html" class="button">Go back to Main Search Page</a>
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