<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthController;



Route::middleware('web')->group(function () { 
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});



// Load admin routes
require __DIR__.'/admin/index.php';

// Load mobile routes
require __DIR__.'/mobile/index.php';
