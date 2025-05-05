<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionType extends Model
{
    use HasFactory;

    protected $primaryKey = 'missionTypeID';

    protected $fillable = ['category', 'complexity'];

    public function missions()
    {
        return $this->hasMany(Mission::class, 'missionTypeID');
    }
}