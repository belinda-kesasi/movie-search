<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\MovieService;
use GuzzleHttp\Client; // Import the Guzzle Client class

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(MovieService::class, function ($app) {
            return new MovieService(new Client()); 
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}