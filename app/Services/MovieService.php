<?php

namespace App\Services;

use GuzzleHttp\Client;

class MovieService
{
    protected $client;
    protected $apiKey;

    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->apiKey = env('MOVIE_DB_API_KEY');
    }

    public function searchMovies($query, $page = 1, $sortBy = 'release_date.desc')
    {    
        $response = $this->client->get('https://api.themoviedb.org/3/search/movie', [
            'query' => [
                'api_key' => $this->apiKey,
                'query' => $query,
                'page' => $page,
                'sort_by' => $sortBy, 
            ]
        ]);
    
        $data = json_decode($response->getBody()->getContents(), true);
    
        return [
            'results' => $data['results'] ?? [],
            'total_pages' => $data['total_pages'] ?? 1,
            'current_page' => $page,
            'per_page' => 20,
        ];
    }


    public function getMovieDetails($movieId)
    {
        $response = $this->client->get("https://api.themoviedb.org/3/movie/{$movieId}", [
            'query' => [
                'api_key' => $this->apiKey
            ]
        ]);

        return json_decode($response->getBody()->getContents());
    }
}