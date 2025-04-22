<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Driver extends Model
{
    use HasFactory;

    protected $primaryKey = 'driverID';

    protected $fillable = [
        'userID',
        'license_number',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }
}