<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('drivers', function (Blueprint $table) {
            $table->id('driverID');
            $table->foreignId('userID')->constrained('users')->onDelete('cascade');
            $table->string('license_number');
            $table->enum('status', ['Available', 'On Mission', 'Unavailable'])->default('Available');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('drivers');
    }
};
