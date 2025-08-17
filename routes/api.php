<?php

use App\Http\Controllers\Api\ProfessorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\GroupController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Protected routes (require valid Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Example: get current authenticated user info
    Route::get('/user', function (Request $request) {
        return $request->user();
    }); 

    // User CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
});

    // Professor CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('professors', ProfessorController::class);
});
 // Student CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('students', StudentController::class);
});
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('groups', GroupController::class);
});
});
