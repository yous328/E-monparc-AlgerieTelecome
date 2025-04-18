<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleInsurance extends Model
{
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
