<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VehicleBrand extends Model
{

    use HasFactory;

    protected $primaryKey = 'brandID';

    protected $fillable = ['name', 'logo'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'brandID');
    }
}
