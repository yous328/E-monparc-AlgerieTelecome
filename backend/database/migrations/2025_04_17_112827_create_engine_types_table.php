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
        Schema::create('engine_types', function (Blueprint $table) {
            $table->id('engineTypeID');
            $table->foreignId('brandID')->constrained('vehicle_brands', 'brandID')->onDelete('cascade');
            $table->string('name');
            $table->string('capacity');
            $table->foreignId('fuelTypeID')->constrained('fuel_types', 'fuelTypeID')->onDelete('cascade');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('engine_types');
    }
};
