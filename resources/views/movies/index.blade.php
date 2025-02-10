<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Search</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>

<div class="container mt-5">
    <h1>Search Movies</h1>

    <button id="show-favorites" class="btn btn-outline-primary mb-4" onclick="toggleFavoriteView()" style="display:none;">Show Favorites</button>

    <button id="back-to-search" class="btn btn-outline-secondary mb-4" onclick="backToSearch()" style="display:none;">Back to Search</button>

    <form id="search-form" class="mb-4">
        <div class="d-flex justify-content-between">
            <input type="text" id="search-query" class="form-control me-2" placeholder="Enter movie title" aria-label="Search movie">
            
            <select id="sort-order" class="form-select w-auto" style="max-width: 200px;">
                <option value="asc">Sort by Release Date (Ascending)</option>
                <option value="desc">Sort by Release Date (Descending)</option>
            </select>
            
            <button type="submit" class="btn btn-primary ms-2">Search</button>
        </div>
    </form>

    <div id="loading" class="d-none text-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <div id="movies-container" class="mt-4"></div>

    <div id="pagination-container" class="mt-4"></div>

    <div id="error-message" class="d-none alert alert-warning mt-3" role="alert"></div>

</div>

<script src="{{ asset('js/movie-search.js') }}"></script>

</body>
</html>