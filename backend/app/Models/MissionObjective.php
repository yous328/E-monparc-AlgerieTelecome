<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MissionObjective extends Model
{
    use HasFactory;

    protected $primaryKey = 'missionObjectiveID';

    protected $fillable = ['name'];

    public function missions()
    {
        return $this->hasMany(Mission::class, 'missionObjectiveID');
    }
}