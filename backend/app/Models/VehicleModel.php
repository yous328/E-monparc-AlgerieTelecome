<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VehicleModel extends Model
{
    use HasFactory;

    protected $primaryKey = 'modelID';
    protected $fillable = ['model_name', 'brandID'];

    public function brand()
    {
        return $this->belongsTo(VehicleBrand::class, 'brandID');
    }

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'modelID');
    }
}

