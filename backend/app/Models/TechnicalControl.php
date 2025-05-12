<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TechnicalControl extends Model
{

    use HasFactory;

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