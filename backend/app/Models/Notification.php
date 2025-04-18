<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $primaryKey = 'notificationID';

    protected $fillable = [
        'userID',
        'vehicleID',
        'missionID',
        'problemID',
        'maintenanceID',
        'title',
        'message',
        'type',
        'status',
    ];

    // Relationships

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }

    public function mission()
    {
        return $this->belongsTo(Mission::class, 'missionID');
    }

    public function problem()
    {
        return $this->belongsTo(ProblemReport::class, 'problemID');
    }

    public function maintenance()
    {
        return $this->belongsTo(VehicleMaintenance::class, 'maintenanceID');
    }
}
