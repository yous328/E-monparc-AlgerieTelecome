<?php

use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\Admin\Notifications\NotificationController;


Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin/notifications')
    ->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::get('/{id}', [NotificationController::class, 'show']);
        Route::patch('/{id}/read', [NotificationController::class, 'markAsRead']);
    });
