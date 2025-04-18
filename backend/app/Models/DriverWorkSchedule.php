<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriverWorkSchedule extends Model
{
    protected $primaryKey = 'scheduleID';

    protected $fillable = ['driverID', 'contract_type', 'work_days', 'shift_times'];

    protected $casts = [
        'work_days' => 'array',
        'shift_times' => 'array',
    ];

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driverID');
    }
}
