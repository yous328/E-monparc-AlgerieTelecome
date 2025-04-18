<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FuelType extends Model
{
    protected $primaryKey = 'fuelTypeID';

    protected $fillable = ['name'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'fuelTypeID');
    }
}

