<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('driver_work_schedules', function (Blueprint $table) {
            $table->id('scheduleID');
            $table->foreignId('driverID')->constrained('drivers', 'driverID')->onDelete('cascade');
            $table->enum('contract_type', ['full_time', 'part_time']);
            $table->json('work_days'); // e.g., ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"]
            $table->json('shift_times'); // e.g., {"morning": "08:00-16:00"}
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_work_schedules');
    }
};
