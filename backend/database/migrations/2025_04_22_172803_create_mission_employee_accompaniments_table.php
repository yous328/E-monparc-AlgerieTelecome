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
        Schema::create('mission_employee_accompaniments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('missionID')->constrained('missions', 'missionID')->onDelete('cascade');
            $table->foreignId('employeeID')->constrained('employees', 'employeeID')->onDelete('cascade');
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mission_employee_accompaniments');
    }
};
