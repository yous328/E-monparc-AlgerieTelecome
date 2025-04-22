<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\Dashboard\DashboardController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Admin-only routes (Web platform)
Route::middleware(['auth:sanctum', 'role:Admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    
});

// Mobile-only routes (Mobile app)
Route::middleware(['auth:sanctum', 'role:Driver'])->prefix('mobile')->group(function () {

});

