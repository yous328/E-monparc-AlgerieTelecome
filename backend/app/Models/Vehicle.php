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
        'fuel_level',
        'average_consumption',
        'current_consumption',
        'cost_per_km',
        'daily_cost',
        'vehicleInsuranceID',
        'technicalControlID',
        'last_maintenance_date',
        'next_available_date',
        'photo',
        'monthly_kilometrage',
        'mission_stats',
        'consumption'
    ];

    protected $casts = [
        'monthly_kilometrage' => 'array',
        'mission_stats' => 'array',
        'consumption' => 'array',
    ];

    public function brand()
    {
        return $this->belongsTo(VehicleBrand::class, 'brandID');
    }
    public function model()
    {
        return $this->belongsTo(VehicleModel::class, 'modelID');
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
        return $this->hasOne(VehicleMaintenance::class, 'vehicleID');
    }
    public function missions()
    {
        return $this->hasMany(Mission::class, 'vehicleID');
    }
    public function technicalStatus()
    {
        return $this->hasOne(VehicleTechnicalStatus::class, 'vehicleID');
    }
    public function usageHistory()
    {
        return $this->hasMany(VehicleUsageHistory::class, 'vehicleID');
    }
}
