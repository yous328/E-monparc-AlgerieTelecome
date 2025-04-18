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
        Schema::create('mission_plans', function (Blueprint $table) {
            $table->id('planID');
            $table->foreignId('missionID')->constrained('missions', 'missionID')->onDelete('cascade');
            $table->foreignId('driverID')->constrained('drivers', 'driverID')->onDelete('cascade');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('mission_type', ['short', 'long']);
            $table->enum('complexity', ['simple', 'medium', 'complex'])->nullable();
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mission_plans');
    }
};
