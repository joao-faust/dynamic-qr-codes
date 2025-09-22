<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = Auth::user();

        $locale = Session::get('locale', app()->currentLocale());

        return array_merge(parent::share($request), [
            'auth' => $user ? [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'data_changed' => $user->data_changed,
                ],
            ] : null,

            'session' => [
                'tokens' => [
                    'csrf' => $request->session()->token(),
                ],

                'locale' => $locale,
            ],

            'lang' => File::json(base_path("lang/{$locale}.json")),
        ]);
    }
}
