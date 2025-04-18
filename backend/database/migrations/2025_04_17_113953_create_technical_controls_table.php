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
        Schema::create('technical_controls', function (Blueprint $table) {
            $table->id('technicalControlID');
            $table->date('control_date');
            $table->date('expiration_date');
            $table->enum('status', ['Pending', 'Passed', 'Failed']);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technical_controls');
    }
};
