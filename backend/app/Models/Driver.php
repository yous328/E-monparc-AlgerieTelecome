<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\LicenseType;

class Driver extends Model
{
    use HasFactory;

    protected $primaryKey = 'driverID';

    protected $fillable = [
        'userID',
        'license_number',
        'licenseTypeID',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    public function licenseType()
    {
        return $this->belongsTo(LicenseType::class, 'licenseTypeID');
    }
}
