<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Admin-only routes (Web platform)
Route::middleware(['auth:sanctum', 'role:Admin'])->prefix('admin')->group(function () {
    
});

// Mobile-only routes (Mobile app)
Route::middleware(['auth:sanctum', 'role:Driver'])->prefix('mobile')->group(function () {

});

