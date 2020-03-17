(function() {
    const baseUrl = 'https://movie-list.alphacamp.io/'
    const posterUrl = baseUrl + 'posters/'
    const indexUrl = baseUrl + 'api/v1/movies/'
    const dataPanel = document.querySelector('#data-panel');
    const data = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    // console.log(data)
    // display the movies when requested

    displayDataList(data)

    function displayDataList(data) {
        let htmlContent = ``
        data.forEach(function(item, index) {
            htmlContent += `
            <div class="col-sm-3">
                <div class="card mb-2">
                    <img class="card-img-top" src="${posterUrl}${item.image}" alt="Card image cap">
                    <div class="card-body movie-item-body">
                        <h6 class="card-title">${item.title}</h6>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
                        <button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button>
                    </div>
                </div>
            </div>
            
            `
        })
        dataPanel.innerHTML = htmlContent
    }

    // click movie for more details
    dataPanel.addEventListener('click', function(e) {
        if (e.target.matches('.btn-show-movie')) {
            showMovie(e.target.dataset.id)
        } else if (e.target.matches('.btn-remove-favorite')) {
            removeFavoriteItem(e.target.dataset.id)
        }
    })      

      // show details of clicked movie
      function showMovie(id) {
        const modalTitle = document.querySelector('#show-movie-title')
        const modalImage = document.querySelector('#show-movie-image')
        const modalDate = document.querySelector('#show-movie-date')
        const modalDescription = document.querySelector('#show-movie-description')

        const movie = data.find(item => item.id === Number(id))
        // console.log(movie)
            modalTitle.textContent = movie.title
            modalImage.innerHTML = `
                <img src="${posterUrl}${movie.image}" class="img-fluid" alt="Responsive image">
            `
            modalDate.textContent = `release at: ${movie.release_date}`
            modalDescription.textContent = `${movie.description}`
      }

      // remove movie
      function removeFavoriteItem(id) {
        // find the index of id 
        const idIndex = data.findIndex(item => item.id === Number(id))
        // console.log(idIndex)
        // if it can't find the id number, jump out of this function
        // 這邊做檢查的用意是為了防止意外或者不正常使用時, 導致錯誤的發生
        if (idIndex === -1) return
        // remove id from the array
        data.splice(idIndex, 1)
        // update the local storage data
        localStorage.setItem('favoriteMovies', JSON.stringify(data))
        // refresh the results on the screen
        displayDataList(data)
      }
})()