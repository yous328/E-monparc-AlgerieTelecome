<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Admin\Employees\EmployeeController;


Route::middleware(['auth:sanctum', 'role:Admin'])
    ->prefix('admin/employees')
    ->group(function () {
        Route::get('/', [EmployeeController::class, 'index']);
        Route::post('/', [EmployeeController::class, 'store']);
        Route::get('/{id}', [EmployeeController::class, 'show']);
        Route::put('/{id}', [EmployeeController::class, 'update']);
        Route::delete('/{id}', [EmployeeController::class, 'destroy']);
    });
