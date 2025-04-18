<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProblemReport extends Model
{
    use HasFactory;

    protected $primaryKey = 'problemID';

    protected $fillable = [
        'reported_by',
        'vehicleID',
        'missionID',
        'maintenanceID',
        'problem_type_id',
        'description',
        'status',
        'image_path',
    ];

    // Relationships
    public function reporter()
    {
        return $this->belongsTo(User::class, 'reported_by');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }

    public function mission()
    {
        return $this->belongsTo(Mission::class, 'missionID');
    }

    public function maintenance()
    {
        return $this->belongsTo(VehicleMaintenance::class, 'maintenanceID');
    }

    public function type()
    {
        return $this->belongsTo(ProblemType::class, 'problem_type_id');
    }
}