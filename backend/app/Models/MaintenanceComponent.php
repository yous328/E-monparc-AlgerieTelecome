<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceComponent extends Model
{
    protected $primaryKey = 'componentID';

    protected $fillable = [
        'maintenanceID',
        'typeID',
        'inspection_date',
        'replaced',
        'next_due_km',
        'status',
        'notes',
    ];

    public function maintenance()
    {
        return $this->belongsTo(VehicleMaintenance::class, 'maintenanceID');
    }

    public function type()
    {
        return $this->belongsTo(MaintenanceType::class, 'typeID');
    }
}