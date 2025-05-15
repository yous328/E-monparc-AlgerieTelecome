<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Breakdown extends Model
{
    protected $fillable = ['vehicleID', 'breakdownTypeID', 'date', 'description'];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }

    public function breakdownType()
    {
        return $this->belongsTo(BreakdownType::class, 'breakdownTypeID');
    }
} 