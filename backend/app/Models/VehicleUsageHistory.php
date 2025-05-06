<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VehicleUsageHistory extends Model
{

    use HasFactory;

    protected $fillable = [
        'vehicleID',
        'driver_name',
        'driver_phone',
        'usage_date',
        'route',
        'distance_km',
        'average_speed',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }
}
