<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EngineType extends Model
{

    use HasFactory;

    protected $primaryKey = 'engineTypeID';

    protected $fillable = ['name'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class, 'engineTypeID');
    }
}