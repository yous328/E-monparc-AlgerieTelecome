<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngineType extends Model
{
    protected $primaryKey = 'engineTypeID';

    protected $fillable = ['name'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'engineTypeID');
    }
}