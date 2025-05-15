<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBreakdownsTable extends Migration
{
    public function up()
    {
        Schema::create('breakdowns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicleID')->constrained('vehicles', 'vehicleID')->onDelete('cascade');
            $table->foreignId('breakdownTypeID')->constrained('breakdown_types', 'id')->onDelete('cascade');
            $table->date('date');
            $table->text('description');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('breakdowns');
    }
} 