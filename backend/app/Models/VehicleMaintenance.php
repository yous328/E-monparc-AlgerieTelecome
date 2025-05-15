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
        'maintenanceTypeID',
        'kilometrage',
        'date',
        'interval_km',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }

    public function type()
    {
        return $this->belongsTo(MaintenanceType::class, 'maintenanceTypeID');
    }
}
