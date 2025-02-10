<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Movie Details</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">
    <div class="card shadow-sm mb-4">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w500{{ $movie->poster_path }}" class="img-fluid rounded-start" alt="{{ $movie->title }}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h1 class="card-title mb-3">{{ $movie->title }}</h1>
                    <p class="card-text">{{ $movie->overview }}</p>
                    <p><strong>Rating:</strong> {{ $movie->vote_average }}</p>
                    <p><strong>Genres:</strong> 
                        @foreach($movie->genres as $genre)
                            {{ $genre->name }}@if (!$loop->last), @endif
                        @endforeach
                    </p>
                    <p><strong>Runtime:</strong> {{ $movie->runtime }} minutes</p>
                    <a href="/" class="btn btn-secondary">Back to Search</a>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>