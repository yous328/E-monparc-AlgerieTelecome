<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Mission extends Model
{
    use HasFactory;

    protected $primaryKey = 'missionID';

    protected $fillable = [
        'vehicleID',
        'driverID',
        'accompanyingEmployeeID',
        'missionTypeID',
        'complexity',
        'estimated_end_date',
        'departure_location',
        'destination',
        'mission_date',
        'mission_time',
        'status',
        'missionObjectiveID',
        'description',
        'created_by'
    ];

    // Relationships

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driverID');
    }

    public function accompanyingEmployee()
    {
        return $this->belongsTo(Employee::class, 'accompanyingEmployeeID');
    }

    public function accompanyingEmployees()
    {
        return $this->belongsToMany(Employee::class, 'mission_employee_accompaniments', 'missionID', 'employeeID');
    }

    public function missionType()
    {
        return $this->belongsTo(MissionType::class, 'missionTypeID');
    }

    public function missionObjective()
    {
        return $this->belongsTo(MissionObjective::class, 'missionObjectiveID');
    }

    public function createdBy()
{
    return $this->belongsTo(User::class, 'created_by', 'id');
}

}
