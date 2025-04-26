<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\AuthController;

// AUTH ROUTES (shared for Admin + Driver)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/check', [AuthController::class, 'checkAuth']);




// Load admin routes
require __DIR__.'/admin/index.php';

