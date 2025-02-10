<?php

namespace App\Http\Controllers;

use App\Services\MovieService;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    protected $movieService;

    public function __construct(MovieService $movieService)
    {
        $this->movieService = $movieService;
    }

    public function index()
    {
        return view('movies.index');
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $page = $request->input('page', 1);
        $sortBy = $request->input('sort_by', 'release_date.desc');

        $movies = $this->movieService->searchMovies($query, $page, $sortBy);
    
        return response()->json($movies);
    }

    public function show($id)
    {
        $movie = $this->movieService->getMovieDetails($id);
        return view('movies.show', compact('movie'));
    }
}