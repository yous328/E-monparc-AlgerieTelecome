<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechnicalControl extends Model
{
    protected $primaryKey = 'technicalControlID';

    protected $fillable = [
        'control_date',
        'expiration_date',
        'status'
    ];

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class, 'technicalControlID');
    }
}