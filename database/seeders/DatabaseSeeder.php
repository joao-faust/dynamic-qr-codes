<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->find(1);

        if (!$user) {
            $newUser = new User();
            $newUser->type = 'superadmin';
            $newUser->name = 'Super Admin';
            $newUser->email = 'super@admin.com';
            $newUser->password = 'superadmin';
            $newUser->save();
        }
    }
}
