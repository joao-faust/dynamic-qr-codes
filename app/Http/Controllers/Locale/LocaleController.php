<?php

namespace App\Http\Controllers\Locale;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'locale' => 'required|in:pt,en,es',
        ]);

        $locale = $request->input('locale');
        Session::put('locale', $locale);

        return redirect()->back();
    }
}
