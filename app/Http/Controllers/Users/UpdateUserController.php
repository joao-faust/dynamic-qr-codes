<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UpdateUserController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->isMethod('get')) {
            return Inertia::render('Users/Profile/index');
        }

        $rules = [
            'name' => 'required',
            'email' => 'required|email',
            'password' => [
                'nullable',
                Password::min(12)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
                'confirmed',
            ],
        ];

        $data = $request->all();
        $user = User::query()->findOrFail(Auth::id());

        if (!$user->data_changed) {
            $rules['password'][0] = 'required';
            $user->password = $data['password'];
            $user->data_changed = true;
        }

        $user->name = $data['name'];
        $user->email = $data['email'];

        $validator = Validator::make($data, $rules);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $user->save();

        return redirect('/');
    }
}
