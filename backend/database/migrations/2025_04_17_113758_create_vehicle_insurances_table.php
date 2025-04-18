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
        Schema::create('vehicle_insurances', function (Blueprint $table) {
            $table->id('vehicleInsuranceID');
            $table->date('insurance_start_date');
            $table->date('insurance_end_date');
            $table->string('insurance_type');
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_insurances');
    }
};
