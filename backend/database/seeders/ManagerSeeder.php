<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Manager;

class ManagerSeeder extends Seeder
{
    public function run(): void
    {

        $admin = User::create([
            'first_name' => 'Amine',
            'last_name' => 'Bennacer',
            'gender' => 'male',
            'birth_date' => '1990-04-10',
            'address' => 'Rue Hassiba Ben Bouali, Alger',
            'phone_number' => '+213 555 66 77 88',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
            'role' => 'Admin',
            'profile_image' => null,
            'description' => 'Super admin of the fleet management system.',
        ]);

        Manager::create([
            'user_id' => $admin->id
        ]);

    }
}
