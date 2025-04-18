<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaintenanceType extends Model
{
    protected $primaryKey = 'typeID';

    protected $fillable = [
        'name',
        'default_interval_km',
    ];

    public function components()
    {
        return $this->hasMany(MaintenanceComponent::class, 'typeID');
    }
}
