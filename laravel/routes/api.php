<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('users', [UserController::class, 'index']);
Route::post('/add-user', [UserController::class, 'store']);
Route::get('/edit-user/{id}', [UserController::class, 'edit']);
Route::put('/update-user/{id}', [UserController::class, 'update']);
Route::delete('/delete-user/{id}', [UserController::class, 'destroy']);
