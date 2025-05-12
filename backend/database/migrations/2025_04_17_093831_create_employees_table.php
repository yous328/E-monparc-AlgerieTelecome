<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id('employeeID');
            $table->foreignId('userID')->constrained('users')->onDelete('cascade');

            // New fields for intelligent scheduling
            $table->enum('status', ['Available', 'OnMission', 'Resting', 'Unavailable'])->default('Available');
            $table->date('next_available_date')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
