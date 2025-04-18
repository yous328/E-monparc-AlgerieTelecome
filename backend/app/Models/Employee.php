<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $primaryKey = 'employeeID';

    protected $fillable = [
        'userID'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }
}