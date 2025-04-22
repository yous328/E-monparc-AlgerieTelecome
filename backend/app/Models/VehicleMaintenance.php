<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleMaintenance extends Model
{
    use HasFactory;

    protected $primaryKey = 'maintenanceID';

    protected $fillable = [
        'vehicleID',
        'oil_km',
        'oil_date',
        'oil_interval',
        'battery_km',
        'battery_date',
        'battery_interval',
        'spark_plugs_km',
        'spark_plugs_date',
        'spark_plugs_interval',
        'tires_km',
        'tires_date',
        'tires_interval',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }

    public function components()
    {
        return $this->hasMany(MaintenanceComponent::class, 'maintenanceID');
    }
}
