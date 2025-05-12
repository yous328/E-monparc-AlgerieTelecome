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
            $table->foreignId('licenseTypeID')->constrained('license_types', 'licenseTypeID')->onDelete('cascade');
            $table->enum('status', ['Available', 'OnMission', 'Resting', 'Unavailable'])->default('Available');
            $table->enum('work_type', ['full_time', 'part_time'])->default('full_time');
            $table->date('last_mission_end')->nullable();
            $table->date('rest_until')->nullable();
            
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('drivers');
    }
};
