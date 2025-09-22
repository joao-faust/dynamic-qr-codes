<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\QrCodes\{
    QrCodeListController,
    QrCodeController,
    CreateQrCodeController,
    DownloadQrCodeDataController,
    DownloadQrCodeImageController,
    UploadQrCodeDataController
};
use App\Http\Controllers\Visits\VisitsListController;
use App\Http\Controllers\Destinations\RedirectUserToDestController;
use App\Http\Controllers\Locale\LocaleController;
use App\Http\Controllers\Users\{
    UpdateUserController,
    UserController
};

Route::controller(UserController::class)->group(function() {
    Route::match(['get', 'post'], '/login', 'login')->name('login');
    Route::post('/logout', 'logout')->name('logout');
});

Route::post('/update-locale', [LocaleController::class, 'update'])->name('locale.update');

Route::prefix('users')->name('users.')->middleware('auth')->group(function() {
    Route::post('/update', UpdateUserController::class)->name('update');
});

Route::prefix('qrcodes')->name('qrcodes.')->group(function() {
    Route::controller(RedirectUserToDestController::class)->group(function() {
        Route::get('/{id}/destination', 'redirect')->name('redirect');

        Route::post('/{id}/private-destination', 'redirectToPrivate')
            ->name('redirect.private');
    });
});

Route::middleware('auth')->group(function() {
    Route::get('/', QrCodeListController::class)->name('list');

    Route::prefix('qrcodes')->name('qrcodes.')->group(function() {
        Route::controller(QrCodeController::class)->group(function() {
            Route::post('/{id}/switch-version', 'switchVersion')->name('switch-version');
            Route::post('/{id}/delete', 'delete')->name('delete');
        });

        Route::match(['get', 'post'], '/{id}/create', CreateQrCodeController::class)
            ->name('create');

        Route::match(['get', 'post'], '/create', CreateQrCodeController::class)
            ->name('create');

        Route::match(['get', 'post'], '/{id}/create', CreateQrCodeController::class)
            ->name('create.version');

        Route::get('/{id}/download-image', DownloadQrCodeImageController::class)
            ->name('download.image');

        Route::get('/{id}/download-data', DownloadQrCodeDataController::class)
            ->name('download.data');

        Route::get('/{id}/visits', VisitsListController::class)->name('visits');

        Route::post('/upload-data', UploadQrCodeDataController::class)
            ->name('upload.data');
    });
});
