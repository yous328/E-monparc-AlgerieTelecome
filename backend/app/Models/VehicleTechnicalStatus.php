<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VehicleTechnicalStatus extends Model
{

    use HasFactory;

    protected $fillable = [
        'vehicleID',
        'vidange_km',
        'batterie_km',
        'bougies_km',
        'gaz_clim_km',
        'chaine_km',
        'panneaux_km',
        'plaquettes_frein_km',
        'filtres_km',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }
}
