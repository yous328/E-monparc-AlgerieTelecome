<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriverRest extends Model
{
    protected $primaryKey = 'restID';

    protected $fillable = ['driverID', 'start_date', 'end_date', 'source'];

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driverID');
    }
}