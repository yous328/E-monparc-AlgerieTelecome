<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Admin\Dashboard\DashboardController;



Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin/dashboard')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index']);
    });