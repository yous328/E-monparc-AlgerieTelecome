<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionPlan extends Model
{
    use HasFactory;

    protected $primaryKey = 'planID';

    protected $fillable = [
        'missionID', 'driverID', 'start_date', 'end_date', 'mission_type', 'complexity',
    ];

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driverID');
    }

    public function mission()
    {
        return $this->belongsTo(Mission::class, 'missionID');
    }
}