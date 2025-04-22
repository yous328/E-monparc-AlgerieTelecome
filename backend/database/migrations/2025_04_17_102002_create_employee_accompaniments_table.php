<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('employee_accompaniments', function (Blueprint $table) {
            $table->id('accompanimentID');
            $table->foreignId('employee_accompaniment_id')->constrained('employees', 'employeeID')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('employee_accompaniments');
    }
};
