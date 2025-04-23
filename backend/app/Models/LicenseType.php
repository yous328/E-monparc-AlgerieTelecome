<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LicenseType extends Model
{
    use HasFactory;

    protected $primaryKey = 'licenseTypeID';

    protected $fillable = ['type'];

    public function drivers()
    {
        return $this->hasMany(Driver::class, 'licenseTypeID');
    }
}
