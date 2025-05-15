<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BreakdownType extends Model
{
    protected $fillable = ['name'];

    public function breakdowns()
    {
        return $this->hasMany(Breakdown::class, 'breakdownTypeID');
    }
} 