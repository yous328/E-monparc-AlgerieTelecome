<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MaintenanceType extends Model
{
    use HasFactory;

    protected $primaryKey = 'maintenanceTypeID';

    protected $fillable = [
        'name',
        'default_interval_km',
    ];

    public function maintenances()
    {
        return $this->hasMany(VehicleMaintenance::class, 'maintenanceTypeID');
    }
}
