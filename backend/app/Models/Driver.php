<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\LicenseType;
use App\Models\User;

class Driver extends Model
{
    use HasFactory;

    protected $primaryKey = 'driverID';

    protected $fillable = [
        'userID',
        'license_number',
        'licenseTypeID',
        'status',
        'work_type',
        'last_mission_end',
        'rest_until'
    ];

    // Relationship to user account
    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    // Driving license
    public function licenseType()
    {
        return $this->belongsTo(LicenseType::class, 'licenseTypeID');
    }

    // Helpers for mission scheduling

    public function isAvailableFor($date): bool
    {
        return $this->status === 'Available' &&
            ($this->rest_until === null || $this->rest_until < $date);
    }

    public function isFullTime(): bool
    {
        return $this->work_type === 'full_time';
    }

    public function nextAvailableDate(): ?string
    {
        return $this->rest_until ?? now()->toDateString();
    }
}
