<?php

use App\Http\Controllers\Api\ClassesController;
use App\Http\Controllers\Api\GenerationController;
use App\Http\Controllers\Api\Professor_SubjectController;
use App\Http\Controllers\Api\ProfessorController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\SubjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\GroupController;
use App\Http\Controllers\Api\SemesterController;
use App\Http\Controllers\Api\YearController;
use App\Http\Controllers\Api\LectureController;
use App\Http\Controllers\Api\GradeController;
use App\Http\Controllers\Api\AttendanceController;

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

// Group CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('groups', GroupController::class);
});

// Semester CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('semester',SemesterController::class);
});
// Year CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('years', YearController::class);
});

// Generation CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('generations', GenerationController::class);
});

// Subject CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('subjects', SubjectController::class);
});

// Classes CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('classes', ClassesController::class);
});

// Professor_subjects CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('professors_subjects', Professor_SubjectController::class);
});

//Lectures CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('lectures', LectureController::class);
});

//Grades CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('grades', GradeController::class);
});

//Schedules CRUD routes (API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('schedules', ScheduleController::class);
});

//Attendances CRUD rotues(API)
    Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('attendances', AttendanceController::class);
});
});
