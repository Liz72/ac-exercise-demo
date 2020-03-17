
(function() {
    const dataPanel = document.querySelector('#data-panel');
    const baseUrl = 'https://movie-list.alphacamp.io/'
    const posterUrl = baseUrl + 'posters/'
    const indexUrl = baseUrl + 'api/v1/movies/'
    const data = []
    // 連結api，呈現全部的內容和頁數
    axios
    .get (indexUrl)
    .then ((response) => {
        data.push(...response.data.results)
        displayDataList(data)
        getTotalPages(data)
    })
    .catch ((error) => console.log(error))

    function displayDataList(data) {
        // console.log(data[0])
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
                        <button class="btn btn-info btn-add-favorite" data-id="${item.id}">＊</button>
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
        } else if (e.target.matches('.btn-add-favorite')) {
            addFavoriteItem(e.target.dataset.id)
            // console.log(e.target.dataset.id)
        }
    })
    // show details of clicked movie
    function showMovie(id) {
        const modalTitle = document.querySelector('#show-movie-title')
        const modalImage = document.querySelector('#show-movie-image')
        const modalDate = document.querySelector('#show-movie-date')
        const modalDescription = document.querySelector('#show-movie-description')
        const url = indexUrl + id
        // console.log(url)
        // 連結api，呈現視窗的內容
        axios
        .get(url)
        .then(response => {
            const data = response.data.results
            // console.log(data)

            modalTitle.textContent = data.title
            modalImage.innerHTML = `
                <img src="${posterUrl}${data.image}" class="img-fluid" alt="Responsive image">
            `
            modalDate.textContent = `release at: ${data.release_date}`
            modalDescription.textContent = `${data.description}`
        })
    }

    const searchForm = document.querySelector('#search')
    const searchInput = document.querySelector('#search-input')
    // search specific movie and click 
    searchForm.addEventListener('submit', e => {
        e.preventDefault()
        // let input = searchInput.value
        // let result = data.filter(movie => movie.title.toLowerCase().includes(input))
        let results = []
        const regex = new RegExp(searchInput.value, 'i')
        results = data.filter(movie => movie.title.match(regex))
        console.log(results)
        getTotalPages(results)
        getPageData(1, results)
        // displayDataList(result)
    })
    // add clicked movie into favorite local storage
    function addFavoriteItem(id) {
        // as we don't know if any movies in this were stored before, we need to run the storage first to make sure
        // if there are something inside and parse them, otherwise create an empty array.
        const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
        // find if id number is in the data array, it will return the "first" matched result
        const movie = data.find(item => item.id === Number(id))
        // check if id number is duplicate in the local storage
        if (list.some(item => item.id === Number(id))){
            alert(`${movie.title} is already in your favorite list.`)
        } else {
            list.push(movie)
            alert(`Added ${movie.title} to your favorite list!`)
        }
        localStorage.setItem('favoriteMovies', JSON.stringify(list))
    }
    // 分頁結構
    const pagination = document.querySelector('#pagination')
    const itemPerPage = 12
    // create a list of pagination
    function getTotalPages(data) {
        let totalPages = Math.ceil(data.length / itemPerPage) || 1
        let pageItemContent = ''
        for (let i = 0; i < totalPages; i++) {
            pageItemContent += `
                <li class="page-item">
                    <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
                </li>
            `
        }
        pagination.innerHTML = pageItemContent
    }

    // when user clicks one of the pages:
    pagination.addEventListener('click', e => {
        // console.log(e.target.dataset.page)
        if (e.target.tagName === 'A') {
            getPageData(e.target.dataset.page)
        }
    })
    // 1. refresh all the data first
    // 2. refresh all the pagination
    // 3. refresh the current page number's location and contents
    axios
    .get(indexUrl)
    .then((response) => {
        data.push(...response.data.results)
        // console.log(data[0])
        getTotalPages(data)
        getPageData(1, data)
    })
    .catch ((error) => console.log(error))

    let paginationData = [] 
    // locate indicated page number and display the data from an object of the array
    function getPageData(pageNum, data) {
        paginationData = data || paginationData
        // console.log(`PAGE NUM ${pageNum}, data: ${data}`)
        let offset = (pageNum - 1) * itemPerPage
        let pageData = paginationData.slice(offset, offset + itemPerPage)
        displayDataList(pageData)
    }
})()



