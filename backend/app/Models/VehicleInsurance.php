<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VehicleInsurance extends Model
{

    use HasFactory;

    protected $primaryKey = 'vehicleInsuranceID';

    protected $fillable = [
        'insurance_start_date',
        'insurance_end_date',
        'insurance_type'
    ];

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class, 'vehicleInsuranceID');
    }
}
