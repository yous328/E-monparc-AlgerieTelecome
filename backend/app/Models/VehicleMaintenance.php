<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleMaintenance extends Model
{
    protected $primaryKey = 'maintenanceID';

    protected $fillable = [
        'vehicleID',
        'service_date',
        'mileage_at_service',
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

