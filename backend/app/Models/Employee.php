<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $primaryKey = 'employeeID';

    protected $fillable = [
        'userID',
        'status',
        'next_available_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    // Smart scheduling helper
    public function isAvailableFor($date): bool
    {
        return $this->status === 'Available' &&
            ($this->next_available_date === null || $this->next_available_date <= $date);
    }

    public function nextAvailableDate(): ?string
    {
        return $this->next_available_date ?? now()->toDateString();
    }

    public function missions()
    {
        return $this->hasMany(Mission::class, 'accompanyingEmployeeID', 'employeeID');
    }
}
