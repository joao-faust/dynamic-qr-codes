<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UserController extends Controller
{
    public function login(Request $request)
    {
        if ($request->isMethod('get')) {
            return Inertia::render('Users/Login/index');
        }

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect('/');
        }

        return back()->withErrors(['email' => __('auth.failed')]);
    }

    public function logout()
    {
        Auth::logout();
        Session::invalidate();
        Session::regenerateToken();
        return redirect('/login');
    }
}
