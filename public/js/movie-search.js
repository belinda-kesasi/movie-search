let isViewingFavorites = false;

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-query').value;
    const sortOrder = document.getElementById('sort-order').value;
    searchMovies(query, sortOrder);
});

function searchMovies(query, sortOrder = 'desc', page = 1) {
    const loading = document.getElementById('loading');
    const container = document.getElementById('movies-container');
    const pagination = document.getElementById('pagination-container');
    const errorMessage = document.getElementById('error-message');

    loading.classList.remove('d-none');
    container.innerHTML = '';
    pagination.innerHTML = '';
    errorMessage.classList.add('d-none');

    if (isViewingFavorites) {
        const favorites = getFavoriteMovies();
        displayMovies(favorites);
        loading.classList.add('d-none');
        return;
    }

    axios.get('/search', { params: { query, page } })
        .then(response => {
            loading.classList.add('d-none');
            const movies = response.data.results;
            const totalPages = response.data.total_pages;
            const currentPage = response.data.current_page;

            if (movies.length === 0) {
                container.innerHTML = '';
                errorMessage.classList.remove('d-none');
                errorMessage.textContent = 'No movies found.';
                return;
            }

            const sortedMovies = movies.sort((a, b) => {
                const dateA = new Date(a.release_date);
                const dateB = new Date(b.release_date);

                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });

            displayMovies(sortedMovies);

            generatePagination(query, sortOrder, currentPage, totalPages);
        })
        .catch(error => {
            loading.classList.add('d-none');
            container.innerHTML = '';
            errorMessage.classList.remove('d-none');
            errorMessage.textContent = 'Error fetching data!';
        });
}

function displayMovies(movies) {
    const container = document.getElementById('movies-container');
    const row = document.createElement('div');
    row.classList.add('row');

    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('col-md-3', 'col-sm-6', 'mb-3');

        const isFavorite = isMovieFavorite(movie.id) ? 'btn-danger' : 'btn-info';
        const favoriteText = isMovieFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites';

        movieEl.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" class="card-img-top" style="height: 250px; object-fit: cover;" alt="${movie.title}">
                <div class="card-body text-center p-2">
                    <h6 class="mb-1">${movie.title}</h6>
                    <p class="text-muted small">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                    <button class="btn btn-sm ${isFavorite}" id="favorite-button-${movie.id}" onclick="toggleFavorite(${movie.id}, '${movie.title}', '${movie.poster_path}')">${favoriteText}</button>
                    <button class="btn btn-sm btn-info" onclick="viewMovie(${movie.id})">View</button>
                </div>
            </div>
        `;

        row.appendChild(movieEl);
    });

    container.innerHTML = '';
    container.appendChild(row);

    toggleFavoritesButton();
}

function toggleFavoritesButton() {
    const favorites = getFavoriteMovies();
    const showFavoritesButton = document.getElementById('show-favorites');
    const backToSearchButton = document.getElementById('back-to-search');

    if (favorites.length > 0) {
        showFavoritesButton.style.display = 'block';
    } else {
        showFavoritesButton.style.display = 'none';
    }

    if (isViewingFavorites) {
        backToSearchButton.style.display = 'block';
    } else {
        backToSearchButton.style.display = 'none';
    }
}

function generatePagination(query, sortOrder, currentPage, totalPages) {
    const pagination = document.getElementById('pagination-container');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('btn', 'btn-secondary', 'me-2');

        if (i === currentPage) {
            pageButton.classList.add('active');
        }

        pageButton.onclick = function () {
            searchMovies(query, sortOrder, i); 
        };

        pagination.appendChild(pageButton);
    }
}

function viewMovie(id) {
    window.location.href = `/movies/${id}`;
}

function toggleFavorite(movieId, movieTitle, posterPath) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const movieIndex = favorites.findIndex(movie => movie.id === movieId);

    if (movieIndex === -1) {
        favorites.push({ id: movieId, title: movieTitle, poster_path: posterPath });
    } else {
        favorites.splice(movieIndex, 1);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));

    updateFavoriteButton(movieId);

    toggleFavoritesButton();
}

function updateFavoriteButton(movieId) {
    const button = document.getElementById(`favorite-button-${movieId}`);
    if (!button) return;

    const isFavorite = isMovieFavorite(movieId);
    button.classList.toggle('btn-danger', isFavorite);
    button.classList.toggle('btn-info', !isFavorite);
    button.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
}

function isMovieFavorite(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(movie => movie.id === movieId);
}

function getFavoriteMovies() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.map(favorite => ({
        id: favorite.id,
        title: favorite.title,
        poster_path: favorite.poster_path
    }));
}

function toggleFavoriteView() {
    isViewingFavorites = !isViewingFavorites;
    const query = document.getElementById('search-query').value;
    const sortOrder = document.getElementById('sort-order').value;
    searchMovies(query, sortOrder); 
}

function backToSearch() {
    isViewingFavorites = false;
    const query = document.getElementById('search-query').value;
    const sortOrder = document.getElementById('sort-order').value;
    searchMovies(query, sortOrder); 
}