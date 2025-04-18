<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MissionType extends Model
{
    use HasFactory;

    protected $primaryKey = 'missionTypeID';

    protected $fillable = ['name'];

    public function missions()
    {
        return $this->hasMany(Mission::class, 'missionTypeID');
    }
}
