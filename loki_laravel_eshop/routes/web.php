<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/api-register', function () {
    return Inertia::render('authApi/register');
})->name('register');

Route::get('/api-login', function () {
    return Inertia::render('authApi/login');
})->name('register');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/products', function () {
    return Inertia::render('products/index');
})->name('products');

Route::get('/products/create', function () {
    return Inertia::render('products/create');
})->name('products');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
