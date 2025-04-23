<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vehicle extends Model
{
    use HasFactory;

    protected $primaryKey = 'vehicleID';

    protected $fillable = [
        'registration_number',
        'brandID',
        'vehicleTypeID',
        'engineTypeID',
        'fuelTypeID',
        'colorID',
        'status',
        'serviceID',
        'mileage',
        'vehicleInsuranceID',
        'technicalControlID',
        'last_maintenance_date',
        'next_available_date',
    ];

    // Smart availability check
    public function isAvailableFor($date): bool
    {
        return $this->status === 'Available' &&
            ($this->next_available_date === null || $this->next_available_date <= $date);
    }

    public function nextAvailableDate(): ?string
    {
        return $this->next_available_date ?? now()->toDateString();
    }

    // Relationships
    public function brand()
    {
        return $this->belongsTo(VehicleBrand::class, 'brandID');
    }
    public function type()
    {
        return $this->belongsTo(VehicleType::class, 'vehicleTypeID');
    }
    public function engine()
    {
        return $this->belongsTo(EngineType::class, 'engineTypeID');
    }
    public function fuelType()
    {
        return $this->belongsTo(FuelType::class, 'fuelTypeID');
    }
    public function color()
    {
        return $this->belongsTo(Color::class, 'colorID');
    }
    public function service()
    {
        return $this->belongsTo(Service::class, 'serviceID');
    }
    public function insurance()
    {
        return $this->belongsTo(VehicleInsurance::class, 'vehicleInsuranceID');
    }
    public function technicalControl()
    {
        return $this->belongsTo(TechnicalControl::class, 'technicalControlID');
    }
    public function maintenance()
    {
        return $this->hasOne(VehicleMaintenance::class, 'vehicleID', 'vehicleID');
    }
    public function missions()
    {
        return $this->hasMany(Mission::class, 'vehicleID');
    }
}
