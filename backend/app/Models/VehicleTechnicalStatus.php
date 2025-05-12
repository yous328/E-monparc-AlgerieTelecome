<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleTechnicalStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicleID',
        'vidange_done_at', 'vidange_next_due',
        'batterie_done_at', 'batterie_next_due',
        'bougies_done_at', 'bougies_next_due',
        'gaz_clim_done_at', 'gaz_clim_next_due',
        'chaine_done_at', 'chaine_next_due',
        'pneus_done_at', 'pneus_next_due',
        'filtres_done_at', 'filtres_next_due',
        'plaquettes_frein_done_at', 'plaquettes_frein_next_due',
    ];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class, 'vehicleID');
    }
}
